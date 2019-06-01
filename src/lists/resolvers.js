import { generalRequest, getRequest } from '../utilities';
import { url, port } from './server';

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

		ListByName: (_,{name})=>
			generalRequest(`http://${url}:${port}/searchlists`,'POST',name)	
	},
	Mutation: {
		createListVinculations: (_, { listvinculations }) =>
			generalRequest(`${URLListVinculations}`, 'POST', listvinculations),
		updateListVinculations: (_, { id, listvinculations }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'PUT', listvinculations),
		deleteListVinculations: (_, { id }) =>
			generalRequest(`${URLListVinculations}/${id}`, 'DELETE'),

		createList: (_, { list }) =>
			generalRequest(`${URLList}`, 'POST', list),
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
