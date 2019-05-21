import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

// const URL = `http://${url}:${port}${entryPoint}`;
const URL = "http://192.168.1.68:3004/api";
const resolvers = {
	Query: {
		getSongs: (_) =>
      getRequest(`${URL}/songs`, ''),
    playSong: (_, { idSong }) =>
      generalRequest(`${URL}/songs/${idSong}`, 'GET'),
	},
};

export default resolvers;
