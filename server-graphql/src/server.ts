import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { componentsData } from "./data.js";

const app = express();
const httpServer = http.createServer(app);

// Define the schema
const typeDefs = `
  type Component {
    id: ID!
    type: String!
    props: JSON
    children: [Component]
  }

  type Page {
    id: ID!
    name: String!
    layout: Component
  }
  
  type ComponentData {
    id: ID!
    name: String!
    title: String!
    dataKey: ID!
    data: JSON
  }

  type Query {
    getPage(name: String!): Page
    getComponentData(dataKey: String!): ComponentData
  }

  scalar JSON
`;

// Sample data
const pages = [
  {
    id: uuidv4(),
    name: "home",
    layout: {
      id: uuidv4(),
      type: "Grid",
      props: { columns: 2, gap: 4 },
      children: [
        {
          id: uuidv4(),
          type: "Card",
          props: { title: "Welcome" },
          children: [
            {
              id: uuidv4(),
              type: "Text",
              props: { content: "Welcome to our server-driven UI demo!" },
            },
          ],
        },
        {
          id: uuidv4(),
          type: "Card",
          props: { title: "Stats" },
          children: [
            {
              id: uuidv4(),
              type: "List",
              props: {
                items: ["Users: 1,000", "Posts: 5,000", "Comments: 10,000"],
              },
            },
          ],
        },
        {
          id: uuidv4(),
          type: "DataTable",
          props: {
            dataKey: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
          },
        },
      ],
    },
  },
];

interface GetPageArgs {
  name: string;
}

interface GetComponentDataArgs {
  dataKey: string;
}

// Define resolvers
const resolvers = {
  Query: {
    getPage: (_: void, args: GetPageArgs) =>
      pages.find((page) => page.name === args.name),
    getComponentData: (_: void, args: GetComponentDataArgs) =>
      componentsData.find((component) => component.dataKey === args.dataKey),
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  const port = 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

startServer();
