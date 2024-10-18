import { gql, useQuery } from "@apollo/client";
import { TableContent } from "./TableContent";

interface DataTableProps {
  dataKey: string;
  className?: string;
}

// const {
//   name,
//   title,
//   data: tableData,
// } = {
//   name: "Other",
//   title: "Other",
//   data: [
//     {
//       id: 1,
//       name: "Name 1",
//       something: "Something",
//       somethingElse: "Something Else",
//     },
//     {
//       id: 2,
//       name: "Name 2",
//       something: "Something",
//       somethingElse: "Something Else",
//     },
//     {
//       id: 3,
//       name: "Name 3",
//       something: "Something",
//       somethingElse: "Something Else",
//     },
//   ],
// };

const GET_COMPONENT_DATA = gql`
  query GetComponentData($dataKey: String!) {
    getComponentData(dataKey: $dataKey) {
      id
      name
      title
      data
    }
  }
`;

export function DataTable({ dataKey, className }: DataTableProps) {
  const { data, loading, error } = useQuery(GET_COMPONENT_DATA, {
    variables: { dataKey },
  });

  // TODO: Add proper loading and error state components
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, title, data: tableData } = data.getComponentData;

  return (
    <TableContent
      name={name}
      tableData={tableData}
      className={className}
      title={title}
    />
  );
}
