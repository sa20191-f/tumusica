import request from 'request-promise-native';
import { GraphQLUpload } from 'graphql-upload'
import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import fs from 'fs';

// const URL = `http://${url}:${port}${entryPoint}`;
const URL = "http://127.0.0.1:3004/api";

const resolvers = {
  Upload: GraphQLUpload,
	Query: {
    songFileTest: (_) => {
      
    },
    songTest: (_) => 
      getRequest(`${URL}/test`, ''),
		getSongs: (_) =>
      getRequest(`${URL}/songs`, ''),
    playSong: (_, { idSong }) =>
      generalRequest(`${URL}/songs/${idSong}`, 'GET'),
  },
  Mutation: {
    async uploadSong(parent, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const pathFile = `/home/app/temp/${filename}-${Date.now()}`;
      const wstream = fs.createWriteStream(pathFile);
      // Saving file in graphql 
      stream.pipe(wstream);
      stream.on('end', async function () {  
        await request.post('http://127.0.0.1:3002/upload_song', {
          formData: {
            myFile: {
              value: fs.createReadStream(pathFile),
              options: {
                filename,
                contentType: mimetype,
                encoding: encoding,
              }
            },
          },
        });
        fs.unlink(pathFile);
      });
      return { filename, mimetype, encoding };
    }
  }
};
export default resolvers;
 