import { gql } from "@apollo/client";

export const ADD_COMPONENT_TO_PAGE1 = gql`
  mutation AddComponentToPage1(
    $type: String!
    $title: String
    $dataSource: String
    $children: [ComponentInput]
  ) {
    addComponentToPage1(
      type: $type
      title: $title
      dataSource: $dataSource
      children: $children
    ) {
      id
    }
  }
`;
