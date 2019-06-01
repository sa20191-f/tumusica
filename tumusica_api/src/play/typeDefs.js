export const playTypeDef = `
  type Song {
    id: String
    length: Int!
    chunkSize: Int!
    uploadDate: String!
    filename: String!
    md5: String!
  }
`;

export const playQueries = `
  getSongs: [Song]!
  playSong(idSong: String): Song!
  songTest: String!
`;

export const playMutations = `
`;
