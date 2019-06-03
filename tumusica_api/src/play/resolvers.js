import { GraphQLUpload } from 'graphql-upload'
import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}${entryPoint}`;
// const URL = "http://127.0.0.1:3004/api";

const resolvers = {
  Upload: GraphQLUpload,
	Query: {
    songTest: (_) => 
      getRequest(`${URL}/test`, ''),
    playSong: (_, { idSong }) =>
      generalRequest(`${URL}/songs/${idSong}`, 'GET'),
  },
};
export default resolvers;
 