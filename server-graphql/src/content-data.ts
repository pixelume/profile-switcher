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

export let booksData = [
  {
    id: "69097bbb-2745-43bb-ba0e-ef371de33f24",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    published: "1925",
    pages: 180,
  },
  {
    id: "8812dada-47f7-4e2a-8b27-cc62f6b1e5fe",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    published: "1960",
    pages: 281,
  },
  {
    id: "bacbf992-47c4-40de-b642-f0dd614a164d",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    published: "1951",
    pages: 224,
  },
];

// export let dataTableContent = { iterations: iterationsData, books: booksData };
export let dataTableContent = { iterations: iterationsData };

export let textContent = { welcome: "Welcome to our server-driven UI demo!" };

export let listContent = {
  stats: ["Users: 1,000", "Posts: 5,000", "Comments: 10,000"],
  tasks: [
    "Fix rest server",
    "Fix graphql server",
    "Fix tsconfig setup",
    "Fix dark mode",
    "Fix basic styling issues",
    "Interpolation of part of TW utility classes wont work. See AppContext.tsx -> renderComponent() line 42",
    "Create additional routes in the /app/{page}",
    "Change sidebar content te be different in /admin and /app",
    "Add env variables for REST and Gql servers",
    "Create/Mofify GQL schema for UI components",
    "Create schema for iterations data",
    "Separate mock data from ui data",
    "Seperate UI schema from data schema",
    "Restructure code and break into smaller components for better legibility",
    "Create a reusable searchable DataTable component that can work with different data schema's",
    "Create mutations to add, edit and delete entries in the iterations table",
    "Create mutations to add and remove components to a page on the App profile",
    "Allow users to add a DataTable component with iterations data to a page on the App profile",
    "Use Tabler Icons",
    "Redo Main Layout to be a bit more contemporary and responsive with side navigation pushing content out",
  ],
};

export let componentsData = [
  {
    type: "iterations",
    id: "97131800-5f18-402c-9de8-4f1f6fb4c5b2",
    data: iterationsData,
  },
  {
    type: "books",
    id: "0b27156a-1e67-4386-ba1d-13ef011f0125",
    data: booksData,
  },
  // {
  //   type: "welcome",
  //   id: "11fbb562-b148-434a-b7df-ef41880ff166",
  //   data: textContent.find((content) => content.welcome),
  // },
  // {
  //   type: "stats",
  //   id: "56a8ba1b-6c2d-4046-a35e-5337ef31f77c",
  //   data: listContent.find((content) => content.stats),
  // },
];

// Helper functions
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
