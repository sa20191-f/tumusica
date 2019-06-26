import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import {
	listsMutations,
	listsQueries,
	listsTypeDef
} from './lists/typeDefs';

import {
	playQueries,
  playTypeDef,
  playMutations,
} from './play/typeDefs'

import {
	usersQueries,
  usersTypeDef,
  usersMutations,
} from './users/typeDefs'

import {
  uploadTypeDef,
  uploadQueries,
  uploadMutations
} from './upload/typeDefs'

import {
  wsinterfaceTypeDef,
  wsinterfaceQueries,
  wsinterfaceMutations
} from './wsinterface/typeDefs'

import coursesResolvers from './courses/resolvers';
import listsResolvers from './lists/resolvers';
import playResolvers from './play/resolvers';
import usersResolvers from './users/resolvers';
import uploadResolvers from './upload/resolvers';
import wsinterfaceResolvers from './wsinterface/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
    'scalar JSON',
    'scalar Upload',
		coursesTypeDef,
    listsTypeDef,
		playTypeDef,
    usersTypeDef,
    uploadTypeDef,
    wsinterfaceTypeDef
  ],
	[
		coursesQueries,
    listsQueries,
		playQueries,
    usersQueries,
    uploadQueries,
    wsinterfaceQueries
	],
	[
		coursesMutations,
    listsMutations,
		playMutations,
    usersMutations,
    uploadMutations,
    wsinterfaceMutations
	]

);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
    listsResolvers,
		playResolvers,
    usersResolvers,
    uploadResolvers,
    wsinterfaceResolvers
  ),
  uploads: {
    maxFileSize: 18000000, // 18 MB
    maxFiles: 20
  }
});
