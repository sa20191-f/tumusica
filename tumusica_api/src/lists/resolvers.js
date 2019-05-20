import { generalRequest, getRequest } from '../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;
const URLListVinculations = `http://${url}:${port}/list_vinculations`;


const resolvers = {
	Query: {
		allListVinculations: (_) =>
			getRequest(URLListVinculations, ''),
		ListVinculationsById: (_, { id }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'GET'),
	},
	Mutation: {
		createListVinculations: (_, { listvinculations }) =>
			generalRequest(`${URLListVinculations}`, 'POST', listvinculations),
		updateListVinculations: (_, { id, listvinculations }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'PUT', listvinculations),
		deleteListVinculations: (_, { id }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'DELETE')
	}
};

export default resolvers;
