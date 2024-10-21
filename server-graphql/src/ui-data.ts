import { textContent, dataTableContent, listContent } from "./content-data.js";

export type Component = {
  id: string;
  type: string;
  children?: Component[];
  props: {
    content?: any;
    // dataType?: string;
    title?: string;
  };
};

export type ChildComponent = {
  type: string;
  dataSource: string;
  title?: string;
};

export const homeComponents = [
  {
    id: "52796726-ef17-49d9-8976-3194452b8998",
    type: "Card",
    props: { title: "Welcome" },
    children: [
      {
        id: "d861825f-fced-49c6-ac41-62f0a5840510",
        type: "Text",
        props: { content: textContent.welcome },
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
          content: listContent.stats,
        },
      },
    ],
  },
];

let page1Components: Component[] = [
  {
    id: "8b757747-ae4d-4c8f-ae0b-3bb621805856",
    type: "DataTable",
    props: {
      // dataType: "iterations",
      content: dataTableContent.iterations,
      title: "Iterations",
    },
  },
  // {
  //   id: "87467fec-a273-4a38-8070-602707cc0292",
  //   type: "DataTable",
  //   props: {
  //     content: dataTableContent.books,
  //     // dataType: "books",
  //     title: "Books",
  //   },
  // },
];

export const pages = [
  {
    id: "fdca72e2-fdd4-4d6c-a1d6-92f5bbd16a1b",
    name: "home",
    layout: {
      id: "a0cf2183-63b7-47d4-ae39-d91e29134643",
      type: "Grid",
      props: { columns: 2, gap: 4 },
      children: homeComponents,
    },
  },
  {
    id: "aabd5f26-811d-41ed-aa4b-f96a6fc2ae98",
    name: "page1",
    layout: {
      id: "2d1653a0-6cb8-43c7-9ce4-7810e11ff49c",
      type: "Grid",
      props: { columns: 2, gap: 4 },
      children: page1Components,
    },
  },
];

const contentMap = {
  list: listContent,
  dataTable: dataTableContent,
  text: textContent,
};

export function addComponentToPage1(
  type: string,
  // dataType?: string,
  title?: string,
  children?: ChildComponent[],
  dataSource?: string
): Component {
  const newComponent: Component = {
    id: crypto.randomUUID(),
    type: type,
    children: children?.map((child) => {
      const {
        type: childType,
        dataSource: childDataSource,
        title: childTitle,
      } = child as unknown as ChildComponent;
      return {
        ...child,
        id: crypto.randomUUID(),
        props: {
          title: childTitle,
          content:
            childDataSource && childType
              ? (
                  contentMap[
                    (childType.charAt(0).toLowerCase() +
                      childType.slice(1)) as keyof typeof contentMap
                  ] as Record<string, unknown>
                )?.[childDataSource]
              : undefined,
        },
      };
    }),
    props: {
      content:
        dataSource && type
          ? (
              contentMap[
                (type.charAt(0).toLowerCase() +
                  type.slice(1)) as keyof typeof contentMap
              ] as Record<string, unknown>
            )?.[dataSource]
          : undefined,
      // dataType,
      title,
    },
  };

  page1Components.push(newComponent);

  // Update the pages array with the new page1Components
  const page1Index = pages.findIndex((page) => page.name === "page1");
  if (page1Index !== -1) {
    pages[page1Index].layout.children = page1Components;
  }

  return newComponent;
}

export function removeComponentFromPage1(id: string): boolean {
  const initialLength = page1Components.length;
  page1Components = page1Components.filter((component) => component.id !== id);

  // Update the pages array with the new page1Components
  const page1Index = pages.findIndex((page) => page.name === "page1");
  if (page1Index !== -1) {
    pages[page1Index].layout.children = page1Components;
  }

  // Return true if a component was removed, false otherwise
  return page1Components.length < initialLength;
}
