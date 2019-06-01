export const uploadTypeDef = `
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }
`;

export const uploadQueries = `
`;

export const uploadMutations = `
  uploadSong(file: Upload!): File!
`;
