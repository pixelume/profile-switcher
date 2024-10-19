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
