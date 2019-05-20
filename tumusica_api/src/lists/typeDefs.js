export const listsTypeDef = `
type List {
    id: Int
    name: String!
    image: String!
    user_id: Int!
    list_vinculations: [ListVinculations]
 }

 input ListInput {
    name: String!
    image: String!
    user_id: Int!
 }

type ListVinculations {
    id: Int
    user_id: Int!
    list: List
}
input ListVinculationsInput {
    user_id: Int!
    list_id: Int!
}
`;




export const listsQueries = `
    allListVinculations: [ListVinculations]!
    ListVinculationsById(id: Int!): ListVinculations!
    allList: [List]!
    ListById(id: Int!): List!
`;

export const listsMutations = `
    createListVinculations(listvinculations: ListVinculationsInput!): ListVinculations!
    deleteListVinculations(id: Int!): Int
    updateListVinculations(id: Int!, listvinculations: ListVinculationsInput!): ListVinculations!

    createList(list: ListInput!): List!
    deleteList(id: Int!): Int
    updateList(id: Int!, list: ListInput!): List!
`;
