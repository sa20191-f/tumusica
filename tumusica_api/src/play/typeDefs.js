export const playTypeDef = `
  type Song {
    id: String
    length: Int!
    chunkSize: Int!
    uploadDate: String!
    filename: String!
    md5: String!
  },
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }
`;

export const playQueries = `
  getSongs: [Song]!
  playSong(idSong: String): Song!
  songTest: String!
  songFileTest: File
`;

export const playMutations = `
  uploadSong(file: Upload!): File!
`;
