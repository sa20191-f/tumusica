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
type Token{
    token: String!
}
type LoginInfo {
    token: Token!
    id: Int!
}
type Info{
    id: Int!
    username: String!
    email: String!
}
type Logout {
    message: String!
}
type DummySong {
    title: String!
    artist: String!
}
input TokenInput {
    userID: Int!
    tokenType: Int!
    token: String!
}
type TokenInfo {
    id: Int!
    tokenType: Int!
    token: String!
}
input TokenData{
    token: String!
}
`;

export const usersQueries = `
    allUsers: [User]!
    logoutUser: Logout!
    dummy(token: TokenData): [DummySong]!
    getTokens(userID: String!): TokenInfo!
    userInfo(token: TokenData): Info!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    loginUser(user: UserInput!): LoginInfo!
    addToken(token: TokenInput!): String!
`;
