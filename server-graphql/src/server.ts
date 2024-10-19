import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import {
  componentsData,
  pages,
  iterationsData,
  updateIterationsData,
} from "./data.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = http.createServer(app);

// Update the typeDefs
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
    type: String!
    data: JSON
  }

  type Created {
    employee: String!
    datetime: String!
  }

  type Updated {
    employee: String!
    datetime: String!
  }

  type Iteration {
    id: ID!
    name: String!
    created: Created!
    updated: Updated!
    status: String!
  }

  type Mutation {
    createIteration: Iteration
    updateIteration(id: ID!): Iteration
    deleteIteration(id: ID!): Boolean
  }

  type Query {
    getPage(name: String!): Page
    getComponentData(type: String!): ComponentData
  }

  scalar JSON
`;

// Sample data

interface GetPageArgs {
  name: string;
}

interface GetComponentDataArgs {
  type: string;
}

// Update the resolvers
const resolvers = {
  Query: {
    getPage: (_: void, args: GetPageArgs) =>
      pages.find((page) => page.name === args.name),
    getComponentData: (_: void, args: GetComponentDataArgs) =>
      // componentsData.find((component) => component.id === args.id),
      componentsData.find((data) => data.type === args.type),
  },
  Mutation: {
    createIteration: () => {
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      const generatedName = `2023 year-end run ${randomNumber}`;

      const newIteration = {
        id: uuidv4(),
        name: generatedName,
        created: {
          employee: "Spongebob Squarepants",
          datetime: new Date().toISOString(),
        },
        updated: {
          employee: "Spongebob Squarepants",
          datetime: new Date().toISOString(),
        },
        status: "In Progress",
      };
      iterationsData.push(newIteration);
      updateIterationsData(iterationsData);
      return newIteration;
    },
    updateIteration: (_: void, args: { id: string }) => {
      const index = iterationsData.findIndex(
        (iteration) => iteration.id === args.id
      );
      if (index === -1) return null;

      const currentIteration = iterationsData[index];
      const newStatus =
        currentIteration.status === "Completed" ? "In Progress" : "Completed";

      const updatedIteration = {
        ...currentIteration,
        status: newStatus,
        updated: {
          employee: "Peppa Pig",
          datetime: new Date().toISOString(),
        },
      };
      iterationsData[index] = updatedIteration;
      updateIterationsData(iterationsData);
      return updatedIteration;
    },
    deleteIteration: (_: void, args: { id: string }) => {
      const index = iterationsData.findIndex(
        (iteration) => iteration.id === args.id
      );
      if (index === -1) return false;

      iterationsData.splice(index, 1);
      updateIterationsData(iterationsData);
      return true;
    },
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
