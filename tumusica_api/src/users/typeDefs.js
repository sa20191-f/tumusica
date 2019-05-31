export const usersTypeDef = `

type User {
    username: String!
    email: String!
    password: String!
}
input UserInput {
    username: String!
    email: String!
    password: String!
}`;

export const usersQueries = `
    allUsers: [User]!
    users: [User]!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    register(user: UserInput!): User!

`;
