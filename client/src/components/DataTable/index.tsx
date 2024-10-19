import { gql, useQuery } from "@apollo/client";
import { TableContent } from "./TableContent";

interface DataTableProps {
  title: string;
  dataType: string;
  className?: string;
}

export const GET_COMPONENT_DATA = gql`
  query GetComponentData($type: String!) {
    getComponentData(type: $type) {
      id
      type
      data
    }
  }
`;

export const CREATE_ITERATION = gql`
  mutation CreateIteration {
    createIteration {
      id
      name
      status
      updated {
        datetime
        employee
      }
    }
  }
`;

export function DataTable({ title, dataType, className }: DataTableProps) {
  const { data, loading, error } = useQuery(GET_COMPONENT_DATA, {
    variables: { type: dataType },
  });

  // TODO: Add proper loading and error state components
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.getComponentData);

  const { type, data: tableData } = data.getComponentData;

  return (
    <TableContent
      dataType={type}
      tableData={tableData}
      className={className}
      title={title}
      getComponentData={GET_COMPONENT_DATA}
      createMutation={CREATE_ITERATION}
    />
  );
}
