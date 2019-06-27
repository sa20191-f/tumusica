export const playTypeDef = `
  type Song_Path {
    id: String
    path: String!
    song_name: String!
    artist: String!
    v: Int!
    artist: String!
    song_name: String!
  }
`;

export const playQueries = `
  playSong(idSong: String): Song_Path!
  songTest: String!
  songs: [Song_Path!]
`;

export const playMutations = `
`;
