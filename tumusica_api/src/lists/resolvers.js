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
      console.log("CREATE LIST");
      console.log("LIST");
      console.log(list);
      const tokens = await usersResolvers.Query.getTokens(list.user_id);
      console.log("OBTUVE TOKENS");
      console.log(tokens);
      // SEND TO MOBILE
      let requestBody = [];
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
      console.log("REQUEST BODY PARA MOVIL");
      console.log(requestBody);
      console.log(process.env.EXPO_NOTIFICATION);
      request({
        uri: "https://exp.host/--/api/v2/push/send", 
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: requestBody,
        json: true
      });

      // SEND TO WEB
      requestBody = {};
      tokens.map(element => {
        if (element.tokenType == 2) {
          requestBody = {
            data: {
              message: "Has creado una nueva lista",
              type: "LIST_CREATED",
              body: "Felicidades puedes adicionar a tu lista tu musica preferida"
            },
            to: element.token
          };
        }
        return true;
      });
      console.log("REQUEST BODY PARA WEB");
      console.log(requestBody);
      console.log(process.env.WEB_NOTIFICATION);
      request({
        uri: "https://fcm.googleapis.com/fcm/send",
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAfBIen2Q:APA91bHiZJJ-8juaH41ZrTC72c0t7YVXexG5aV0TlLIkY4x5UlFxZcEWWsTO7zEAkkYtRs_MF9jpL5E-3h7E-jArTCMNnFe1kz1cxjldPn_Fyfx2Z84tStSSSDTGNlzGn29R2LQVnDmA',
        },
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
