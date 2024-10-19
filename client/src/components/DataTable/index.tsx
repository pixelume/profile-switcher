import { gql, useQuery } from "@apollo/client";
import { TableContent } from "./TableContent";

interface DataTableProps {
  dataId: string;
  className?: string;
}

export const GET_COMPONENT_DATA = gql`
  query GetComponentData($id: String!) {
    getComponentData(id: $id) {
      id
      name
      title
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

export function DataTable({ dataId, className }: DataTableProps) {
  const { data, loading, error } = useQuery(GET_COMPONENT_DATA, {
    variables: { id: dataId },
  });

  // TODO: Add proper loading and error state components
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.getComponentData);

  const { name, title, data: tableData } = data.getComponentData;

  return (
    <TableContent
      name={name}
      tableData={tableData}
      className={className}
      title={title}
      dataId={dataId}
      getComponentData={GET_COMPONENT_DATA}
      createMutation={CREATE_ITERATION}
    />
  );
}
