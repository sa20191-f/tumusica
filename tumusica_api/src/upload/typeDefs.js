export const uploadTypeDef = `
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }
`;

export const uploadQueries = `
  uploads(path: String): Upload!
`;

export const uploadMutations = `
  uploadSong(file: Upload!): File!
`;
