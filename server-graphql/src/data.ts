export const pages = [
  {
    id: "fdca72e2-fdd4-4d6c-a1d6-92f5bbd16a1b",
    name: "home",
    layout: {
      id: "a0cf2183-63b7-47d4-ae39-d91e29134643",
      type: "Grid",
      props: { columns: 2, gap: 4 },
      children: [
        {
          id: "52796726-ef17-49d9-8976-3194452b8998",
          type: "Card",
          props: { title: "Welcome" },
          children: [
            {
              id: "d861825f-fced-49c6-ac41-62f0a5840510",
              type: "Text",
              props: { content: "Welcome to our server-driven UI demo!" },
            },
          ],
        },
        {
          id: "5bf5793a-7b62-4d05-9b5f-1264818c214d",
          type: "Card",
          props: { title: "Stats" },
          children: [
            {
              id: "d8a22869-874a-4b18-99f0-e8763f6242e0",
              type: "List",
              props: {
                items: ["Users: 1,000", "Posts: 5,000", "Comments: 10,000"],
              },
            },
          ],
        },
        {
          id: "8b757747-ae4d-4c8f-ae0b-3bb621805856",
          type: "DataTable",
          props: {
            dataId: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
          },
        },
      ],
    },
  },
  {
    id: "aabd5f26-811d-41ed-aa4b-f96a6fc2ae98",
    name: "page1",
    layout: {
      id: "2d1653a0-6cb8-43c7-9ce4-7810e11ff49c",
      type: "Grid",
      props: { columns: 2, gap: 4 },
      children: [
        {
          id: "3e81a63c-6048-410e-bde6-bf5b31b28709",
          type: "DataTable",
          props: {
            dataId: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
          },
        },
      ],
    },
  },
];

export let iterationsData = [
  {
    id: "99bf63b7-cb01-4374-a1b0-48483956c45c",
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
    id: "dac71a6e-a830-4610-a889-c23cd0b50e81",
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
    id: "f63e660f-4c5f-42c7-8102-61c463a44da3",
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
    id: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
    data: iterationsData,
  },
  // Add more components with their data here
];

export function updateIterationsData(newData: typeof iterationsData) {
  iterationsData = newData;
  // Update the componentsData array with the new iterationsData
  const iterationsComponentIndex = componentsData.findIndex(
    (component) => component.id === "97131800-5f18-402c-9de8-4f1f6fb4c5b2"
  );
  if (iterationsComponentIndex !== -1) {
    componentsData[iterationsComponentIndex].data = newData;
  }
}
