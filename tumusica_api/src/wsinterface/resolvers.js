import { generalRequest, getRequest } from '../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const URLVideo = `http://${url}:${port}/videos`;


const resolvers = {
	Query: {
		
		allFind: (_) =>
			getRequest(URLVideo, ''),

	},
	Mutation: {
		

		createFind: (_, { video }) =>
			generalRequest(`${URLVideo}`, 'POST', video),
		updateFind: (_, { title, video }) =>
			generalRequest(`${URLVideo}`, 'PUT', video),
		deleteFind: (_, { title }) =>
			generalRequest(`${URLVideo}`, 'DELETE'),

	
	}
};

export default resolvers;
