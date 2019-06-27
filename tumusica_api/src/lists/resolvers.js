import request from 'request-promise-native';
import { generalRequest, getRequest } from '../utilities';
import { url, port } from './server';
import usersResolvers from '../users/resolvers';
import ADD_LIST_NT from '../notifications';

const URL = `http://${url}:${port}`;
const URLListVinculations = `http://${url}:${port}/list_vinculations`;
const URLList = `http://${url}:${port}/lists`;
const URLSongVinculations = `http://${url}:${port}/song_vinculations`;

const resolvers = {
	Query: {
		allListVinculations: (_) =>
			getRequest(URLListVinculations, ''),
		ListVinculationsById: (_, { id }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'GET'),

		allList: (_) =>
			getRequest(URLList, ''),
		ListById: (_, { id }) =>
			generalRequest(`${URLList}/${id}`, 'GET'),

		allSongVinculations: (_) =>
			getRequest(URLSongVinculations, ''),
		SongVinculationsById: (_, { id }) =>
			generalRequest(`${URLSongVinculations}/${id}`, 'GET'),
	},
	Mutation: {
		createListVinculations: (_, { listvinculations }) =>
			generalRequest(`${URLListVinculations}`, 'POST', listvinculations),
		updateListVinculations: (_, { id, listvinculations }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'PUT', listvinculations),
		deleteListVinculations: (_, { id }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'DELETE'),

		createList: async(_, { list }) => {
      generalRequest(`${URLList}`, 'POST', list);
      const tokens = await usersResolvers.Query.getTokens(list.user_id);
      const requestBody = [];
      tokens.map(element => {
        if (element.tokenType == 1) {
          requestBody.push({
            data: {
              message: "Has creado una nueva lista",
              type: "LIST_CREATED",
              body: "Felicidades puedes adicionar a tu lista tu musica preferida"
            },
            title: "Has creado una nueva lista",
            body: "Felicidades puedes adicionar a tu lista tu musica preferida",
            to: element.token
          });
        }
        return true;
      });
      request.post(process.env.EXPO_NOTIFICATION, {
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
        json: true
      });
      return list;  
    },
		updateList: (_, { id, list }) =>
			generalRequest(`${URLList}/${id}`, 'PUT', list),
		deleteList: (_, { id }) =>
			generalRequest(`${URLList}/${id}`, 'DELETE'),

		createSongVinculations: (_, { songvinculations }) =>
			generalRequest(`${URLSongVinculations}`, 'POST', songvinculations),
		updateSongVinculations: (_, { id, songvinculations }) =>
			generalRequest(`${URLSongVinculations}/${id}`, 'PUT', songvinculations),
		deleteSongVinculations: (_, { id }) =>
			generalRequest(`${URLSongVinculations}/${id}`, 'DELETE')
	
	}
};

export default resolvers;
