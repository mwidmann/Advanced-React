import gql from 'graphql-tag'

export const QUERY_LOCAL_STATE = gql`
  query QUERY_LOCAL_STATE {
    cartOpen @client
  }
`
