export const playTypeDef = `
  type Song_Path {
    id: String
    path: String!
    v: Int!
  }
`;

export const playQueries = `
  playSong(idSong: String): Song_Path!
  songTest: String!
`;

export const playMutations = `
`;
