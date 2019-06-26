export const wsinterfaceTypeDef = `

type Find{
    find_videos_response: Video
}

input FindInput {
    title: String
 }

type Video {
    titles: String
    links: String
    images: String
}



`;




export const wsinterfaceQueries = `

    allFind: Find

`;

export const wsinterfaceMutations = `

    createFind(video: FindInput): Find
    deleteFind(title: String!): String
    updateFind(title: String!, video: FindInput!): Find!

`;
