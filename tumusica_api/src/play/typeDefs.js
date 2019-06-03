export const playTypeDef = `
  type Song {
    id: String
    path: String!
    v: Int!
  }
`;

export const playQueries = `
  playSong(idSong: String): Song!
  songTest: String!
`;

export const playMutations = `
`;
