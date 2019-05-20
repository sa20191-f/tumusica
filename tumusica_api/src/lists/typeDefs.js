export const listsTypeDef = `
type ListVinculations {
    id: Int
    user_id: Int!
    list_id: Int!
}
input ListVinculationsInput {
    user_id: Int!
    list_id: Int!
}`;




export const listsQueries = `
    allListVinculations: [ListVinculations]!
    ListVinculationsById(id: Int!): ListVinculations!
`;

export const listsMutations = `
    createListVinculations(listvinculations: ListVinculationsInput!): ListVinculations!
    deleteListVinculations(id: Int!): Int
    updateListVinculations(id: Int!, listvinculations: ListVinculationsInput!): ListVinculations!
`;
