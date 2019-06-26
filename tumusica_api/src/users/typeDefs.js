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
}
type LoginInfo {
    token: String!
    id: Int!
}
type Logout {
    message: String!
}
type DummySong {
    title: String!
    artist: String!
}`;

export const usersQueries = `
    allUsers: [User]!
    logoutUser: Logout!
    dummy: [DummySong]!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    loginUser(user: UserInput!): LoginInfo!
`;
