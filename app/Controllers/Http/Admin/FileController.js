'use strict'

const File = use("App/Models/File")
const Folder = use("App/Models/Folder")
const Controller = use("App/Controllers/Http/Admin/Controller")
const Helpers = use('Helpers')
const Drive = use('Drive')
const md5 = use('md5')
const Route = use('Route')

class FileController extends Controller {
    async  index({ request, view }) {
        const page = request.input('page', 1)
        const folder = request.input('folder', '')
        const search = request.input('search', '')
        const folders = await Folder.all()
        const query = File.query();
        if (search.length > 0) {
            query.where('name','LIKE', `%${search}%`)
        }
        const files = await query.where('folder', folder).paginate(page)
        console.log(search, files, folders)
        return view.render('admin.file', { files,folders })
    }

    async api({ request }) {
        const page = request.input('page', 1)
        let files = await File.all();
       
        files = files.rows.map(item => {
            const data = item.toJSON()
            data.url = Route.url('file', { file: data.id })
            data.thumb = Route.url('file.thumb', { file: data.id })
            return data
        })
        return files;
    }

    async upload({ request, response }) {
        const file = request.file('qqfile');
        let name = md5(file.clientName+"bac");
        const folder = request.input('folder', '')
        while(await Drive.exists(name)) {
            name = md5(name + "cdf");
        }
        if (folder.length > 0) {
            name = folder+"/"+name
        }
        if(await Drive.move(file.tmpPath, name)) {
            const _file = new File();
            _file.name = file.clientName;
            _file.path = name;
            _file['content-type']  =  file.headers['content-type'],
            _file.folder = folder;
            if (await _file.save()) {
                console.log(_file);
                return { ..._file.toJSON(), success: true }
            }
        }
        return { success: false }
    }

    async  delete({ request, view, params }) {
        const file = await File.find(params.id);
       
        if (file != null && await Drive.exists(file.path)) {
            await file.delete()
            await Drive.delete(file.path)
        }
        return file;
    }

    async brower() {

    }
}

module.exports = FileController
