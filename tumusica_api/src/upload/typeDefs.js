export const uploadTypeDef = `
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }
  type InfoSong {
    id: String!
    path: String!
    artist: String!
    song_name: String!
  }
  input InfoSongInput{
    artist: String!
    song_name: String!
    path: String!
  }
`;

export const uploadQueries = `
  uploads(path: String!): Upload!
`;

export const uploadMutations = `
  uploadSong(file: Upload!): File!
  uploadInfoSong(infoSong: InfoSongInput!): InfoSong!
`;
