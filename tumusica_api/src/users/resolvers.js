import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const URL_REGISTER = `http://${url}:${port}/${entryPoint}/register/`;
const URL_LOGIN = `http://${url}:${port}/${entryPoint}/login/`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(`${URL}/users`, ''),
		logoutUser: (_) =>
			getRequest(`${URL}/logout`, ''),
		dummy: (_) =>
			getRequest(`${URL}/songs`, ''),
		userInfo: (_) =>
			getRequest(`${URL}/info`, ''),

	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL_REGISTER}`, 'POST', user),
		loginUser: (_, { user }) =>
			generalRequest(`${URL_LOGIN}`, 'POST', user),
	}
};

export default resolvers;
