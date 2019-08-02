'use strict'

const Video = use('App/Models/Video')
const StateVideo = use('App/Models/State/StateVideo')
const uniqid = use('uniqid')
const Config = use('Config')
const Event = use('Event')

class VideoController {
    constructor() {
        this.model = Video
        this.prefix =  {
            route: 'admin.videos',
            view: 'admin.video'
        }
    }

    async index ({ request, params, view }) {
        const page = request.input('page', 1)
        const search = request.input('search', '')
        const state_id = request.input('state_id', 0)
        const states = (await StateVideo.all()).toJSON()
        const query = this.model.query().with('state')
        states.push({ id : 0, name: 'Tất Cả'})
        if (search.length > 0) {
            query.where('name','LIKE', `%${search}%`)
        }
        if (state_id != 0) {
            query.where('state_id', state_id)
        }
        const list = await query.paginate(page)
        return view.render(`${this.prefix.view}.index`, { list : list.toJSON(), states })
    }


    async create ({ view, request }) {
        const states = await StateVideo.all()
        return view.render(`${this.prefix.view}.add`, {
            states : states.toJSON()
        })
    }

    async store({ request, response, session }) {
        const data = request.only(this.model.dataSchema)
        const file = request.file('file')
        const path = Config.get('drive.disks.video.root')
        const id = uniqid()
        const item = new this.model()
        item.fill(data)
        item.path = `${path}/${id}.${file.subtype}`
        item.content_type  =  file.headers['content-type']
        item.state_id = 1
        item.id = id
        if (await item.save()) {
            await file.move(path, {
                name: `${id}.${file.subtype}`
            })
            const video = item.toJSON()
            Event.fire('handle::video',{  ...video, id } )
            session.flash({ notification: 'Tạo Mới Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`, true)
        }
        session.flash({ notification: 'Tạo Mới Không Thành Công', type: 'error' })
        return response.redirect('back')
    }

    async edit ({ request, params, view }) {
        const item = await this.getById(params)
        return view.render(`${this.prefix.view}.edit`, { item: item.toJSON() })
    }

    async update ({ request, params, response, session }) {
        const item = await this.getById(params)
        const data = request.only(this.model.dataSchema)
        await item.merge(data)
        
        if (await item.save()) {
            session.flash({ notification: 'Cập Nhập Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`, true)
        }
        session.flash({ notification: 'Không Có Cập Nhập', type: 'error' })
        return response.redirect('back')
    }

    async destroy ({ request, params, response, session }) {
        const item = await this.getById(params)
        if(await item.delete()) {
            session.flash({ notification: 'Xóa Thành Công', type: 'success' })
        } else {
            session.flash({ notification: 'Xóa Không Thành Công', type: 'error' })
        }
        return response.route(`${this.prefix.route}.index`, true)
    }

    async getById({ id }) {
        return await this.model.findOrFail(id)
    }
}

module.exports = VideoController
