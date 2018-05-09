'use strict'

const File = use("App/Models/File")
const Folder = use("App/Models/Folder")
const Drive = use('Drive')
const sharp = use('sharp')

class FileController {
    async index({ request, params, response }) {
     
        const file_id = params.file;
        const file = await File.find(file_id)
       
        if (file == null && !await Drive.exists(file.path)) {
            return response.send('Not Found', 404)
        }
        response.header('Content-type', file['content-type'])
        response.send(await Drive.get(file.path));
    }

    async thumb({ request, params, response }) {
        const h = parseInt(request.input('h', 320));
        const w = parseInt(request.input('w', 240));
        const file_id = params.file;
        const file = await File.find(file_id)
       
        if (file == null && !await Drive.exists(file.path)) {
            return response.send('Not Found', 404)
        }
        response.header('Content-type', file['content-type'])
        return await sharp(await Drive.get(file.path))
            .resize(h, w).toBuffer();
    }
}

module.exports = FileController
