import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const URL_REGISTER = `http://${url}:${port}/${entryPoint}/register/`;
const URL_LOGIN = `http://${url}:${port}/${entryPoint}/login/`;
const URL_TOKEN = `http://${url}:${port}/${entryPoint}/tokenInfo/`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(`${URL}/users`, ''),
		logoutUser: (_) =>
			getRequest(`${URL}/logout`, ''),
		dummy: (_) =>
      getRequest(`${URL}/songs`, ''),
    getTokens: (userId) => 
      getRequest(`${URL_TOKEN}${userId}`, '')
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL_REGISTER}`, 'POST', user),
		loginUser: (_, { user }) =>
      generalRequest(`${URL_LOGIN}`, 'POST', user),
    addToken: (_, { token }) =>
			generalRequest(`${URL_TOKEN}`, 'POST', token),
	}
};

export default resolvers;
