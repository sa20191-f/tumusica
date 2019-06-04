export const playTypeDef = `
  type Song_Path {
    id: String
    path: String!
    v: Int!
    artist: String!
    song_name: String!
  }
`;

export const playQueries = `
  playSong(idSong: String): Song_Path!
  songTest: String!
`;

export const playMutations = `
`;
