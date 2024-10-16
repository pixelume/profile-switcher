import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TempTable } from "./TempTable";
// import { columnDefinitions } from "./TempTable/columnDefenitions";
// Move to server
import tableData from "./TempTable/table-data.json";
// import { ColumnDef } from "@tanstack/react-table";
// import { Iteration } from "./TempTable/types";

const GET_PAGE = gql`
  query GetPage($name: String!) {
    getPage(name: $name) {
      id
      name
      layout {
        id
        type
        props
        children {
          id
          type
          props
          children {
            id
            type
            props
          }
        }
      }
    }
  }
`;

interface ComponentProps {
  id: string;
  type: string;
  props: any;
  children?: ComponentProps[];
}

const layoutClasses = {
  columns: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  },
  gap: {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
  },
};

const renderComponent = (component: ComponentProps): React.ReactNode => {
  switch (component.type) {
    case "Grid":
      return (
        <div
          key={component.id}
          className={cn(
            "grid",
            layoutClasses.columns[
              component.props.columns as keyof typeof layoutClasses.columns
            ],
            layoutClasses.gap[
              component.props.gap as keyof typeof layoutClasses.gap
            ],
          )}
        >
          {component.children?.map(renderComponent)}
        </div>
      );
    case "Card":
      return (
        <Card key={component.id}>
          <CardHeader>
            <CardTitle>{component.props.title}</CardTitle>
          </CardHeader>
          <CardContent>{component.children?.map(renderComponent)}</CardContent>
        </Card>
      );
    case "Text":
      return <p key={component.id}>{component.props.content}</p>;
    case "List":
      return (
        <ul key={component.id} className="list-disc pl-5">
          {component.props.items.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "Table":
      return (
        <TempTable
          title={component.props.title}
          // columns={component.props.columns}
          data={component.props.data}
        />
      );
    default:
      return null;
  }
};

export function AppContext() {
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: { name: "home" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const page = data.getPage;

  console.log(page);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">App Context: {page.name}</h1>
      {/* {renderComponent(page.layout)} */}
      <div
        className={cn("grid", layoutClasses.columns[2], layoutClasses.gap[4])}
      >
        <TempTable
          title="Iterations"
          className="col-span-full"
          // columns={columnDefinitions as ColumnDef<Iteration, string>[]}
          data={tableData.iterations}
        />
      </div>
    </div>
  );
}
