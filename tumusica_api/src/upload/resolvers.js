import request from 'request-promise-native';
import { GraphQLUpload } from 'graphql-upload';
import { url, port, entryPoint } from './server';
import fs from 'fs';

const URL = `http://${url}:${port}${entryPoint}`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    async uploadSong(parent, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const pathFile = `/home/app/temp/${Date.now()}-${filename}`;
      const wstream = fs.createWriteStream(pathFile);
      // Saving file in graphql 
      stream.pipe(wstream);
      stream.on('end', async function () {
        await request.post(`${URL}/upload_song`, {
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
        console.log('SUCCESSFUL');
        // Delete file in graphql
        fs.unlink(pathFile);
      });
      return { filename, mimetype, encoding };
    }
  }
};
export default resolvers;
 