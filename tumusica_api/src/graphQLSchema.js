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

import coursesResolvers from './courses/resolvers';
import listsResolvers from './lists/resolvers';
import playResolvers from './play/resolvers';
import usersResolvers from './users/resolvers';


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
    'scalar JSON',
    'scalar Upload',
		coursesTypeDef,
    listsTypeDef,
		playTypeDef,
		usersTypeDef
	],
	[
		coursesQueries,
    listsQueries,
		playQueries,
		usersQueries
	],
	[
		coursesMutations,
    listsMutations,
		playMutations,
		usersMutations
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
		usersResolvers
  ),
  uploads: {
    maxFileSize: 18000000, // 18 MB
    maxFiles: 20
  }
});
