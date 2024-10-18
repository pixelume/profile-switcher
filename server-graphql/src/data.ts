import { v4 as uuidv4 } from "uuid";

export const iterationsData = [
  {
    id: 1,
    name: "2024 year-end run 1",
    created: {
      employee: "Riaan Kirchner",
      datetime: "2024-04-05 10:23:23",
    },
    updated: {
      employee: "Neil Kleynhans",
      datetime: "2024-04-05 10:32:21",
    },
    status: "Completed",
  },
  {
    id: 2,
    name: "2024 year-end run 2",
    created: {
      employee: "Francois Kruger",
      datetime: "2024-04-05 14:43:26",
    },
    updated: {
      employee: "Neil Kleynhans",
      datetime: "2024-04-06 08:42:52",
    },
    status: "In Progress",
  },
  {
    id: 3,
    name: "2024 year-end run 3",
    created: {
      employee: "Richard Montgomery",
      datetime: "2024-04-06 14:43:26",
    },
    updated: {
      employee: "Michaela Bogiages",
      datetime: "2024-04-07 08:32:21",
    },
    status: "In Progress",
  },
];

export const componentsData = [
  {
    name: "Iterations",
    title: "Iterations",
    dataKey: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
    id: uuidv4(),
    data: iterationsData,
  },
  // Add more components with their data here
];
