import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import coursesResolvers from './courses/resolvers';

import {
	listsMutations,
	listsQueries,
	listsTypeDef
} from './lists/typeDefs';

import listsResolvers from './lists/resolvers';



// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		coursesTypeDef,
		listsTypeDef
	],
	[
		coursesQueries,
		listsQueries
	],
	[
		coursesMutations,
		listsMutations
	]

);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
		listsResolvers
	)
});
