import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const URL_REGISTER = `http://${url}:${port}/${entryPoint}/register/`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(`${URL}/users`, ''),
			
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL_REGISTER}`, 'POST', user),

	}
};

export default resolvers;
