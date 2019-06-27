import request from 'request-promise-native';
import { GraphQLUpload } from 'graphql-upload';
import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint, path_url, path_port, path_entryPoint } from './server';
import fs from 'fs';
import * as play from '../play/resolvers';

const URL = `http://${url}:${port}${entryPoint}`;
const PATH_URL = `http://${path_url}:${path_port}${path_entryPoint}`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: { 
    async uploads (_, { path }) {
      await request.get(`${URL}/getfile/${path}`, function(error, response){
        console.log(response.body)
      });
    }
     
  },
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
        },function(error, response){
          
          console.log(response.body)
          const obj = JSON.parse(response.body)
          console.log(obj.filename)
          var request2 = require("request");
          var options = { method: 'POST',
            url: `${PATH_URL}/song-path`,
            headers: 
            {
              'Content-Type': 'application/json' },
            body: { "path": obj.filename, "song_name": obj.originalname, "artist": "artist"},
            json: true };
          console.log(options)
          request2(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(response.body);
          });
        });
        // Delete file in graphql
        fs.unlink(pathFile);
      });
      return { filename, mimetype, encoding };
    }
  }
};
export default resolvers;
 