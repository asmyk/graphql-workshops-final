const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mutation {
    login(email: String, password: String): UserLoginResponse 
    register(email: String, username:String, password: String): User 
    review(content: String!, note: Int!, restaurant: ID!): Review
  }

  type UserLoginResponse {
    jwt: String!
    user: User
  }

  type Query {
    restaurants(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): RestaurantConnection!
    reviews(pageSize: Int,after: String): ReviewConnection!
    review(id: ID!): Review
    restaurant(id: ID!): Restaurant
    author(id: ID!): User
    me: User
  }

  type RestaurantConnection {
    edges: [RestaurantEdge!]!
    totalCount: Int
    pageInfo: PageInfo
  }

  type RestaurantEdge {
    node: Restaurant!
    cursor: String
  }

  type Restaurant {
    id: ID!
    name: String
    description: String
    address: String
    website: String
    avatar: String
    reviews: ReviewConnection!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    totalCount: Int
    pageInfo: PageInfo
  }

  type ReviewEdge {
    node: Review!
    cursor: String
  }

  type Review {
    id: ID!
    content: String
    note: Int
    author: User
  }
  
  type User {
    id: ID!
    email: String
    username: String
    picture: String
  }

  type PageInfo {
    cursor: String!
    hasNextPage: Boolean!
  }
`;

module.exports = typeDefs;
