import { gql } from "@apollo/client";

export const GET_PAGE = gql`
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

export const REMOVE_COMPONENT = gql`
  mutation RemoveComponentFromPage1($id: ID!) {
    removeComponentFromPage1(id: $id)
  }
`;
