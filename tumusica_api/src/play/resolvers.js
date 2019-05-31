import { GraphQLUpload } from 'graphql-upload'
import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

// const URL = `http://${url}:${port}${entryPoint}`;
const URL = "http://127.0.0.1:3004/api";

const resolvers = {
  Upload: GraphQLUpload,
	Query: {
    songFileTest: (_) => {
      
    },
    songTest: (_) => 
      getRequest(`${URL}/test`, ''),
		getSongs: (_) =>
      getRequest(`${URL}/songs`, ''),
    playSong: (_, { idSong }) =>
      generalRequest(`${URL}/songs/${idSong}`, 'GET'),
  },
  Mutation: {
    async uploadSong(parent, { file }) {
      console.log(file);
      const { stream, filename, mimetype, encoding } = await file;

      console.log(filename);
      console.log(mimetype);
      console.log(encoding);
      console.log(stream);
      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )
      
      return { filename, mimetype, encoding };
    }
  }
};

export default resolvers;
