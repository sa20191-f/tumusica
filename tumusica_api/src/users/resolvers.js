import { generalRequest, generalRequest1, getRequest } from '../utilities';
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
		dummy: (_,{ token }) =>
			generalRequest1(`${URL}/songs`, '',_,token.token),
    getTokens: (userID) => 
			generalRequest(`${URL_TOKEN}${userID}`, ''),
		userInfo: (_,{ token }) =>
			generalRequest1(`${URL}/info`, '',_,token.token),

	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL_REGISTER}`, 'POST', user),
		loginUser: (_, { user }) =>
      		generalRequest(`${URL_LOGIN}`, 'POST', user),
		addToken: async (_, { token }) => {
      const response = await generalRequest(`${URL_TOKEN}${token.userID}`, '');
      const elements = [];
      if (response.isArray()) {
        response.map(element => {
          if (element.tokenType == token.tokenType && element.token == token.token) {
            elements.push(element);
          }
          return true;
        });
        console.log(elements);
        if (elements.length > 0) {
          return elements[0];
        }
      }
			generalRequest(`${URL_TOKEN}`, 'POST', token)
    },
	}
};

export default resolvers;
