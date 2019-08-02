'use strict'

const User = use('App/Models/User')

class UserController {
    constructor() {
        this.model = User
        this.prefix =  {
            route: 'admin.users',
            view: 'admin.user'
        }
    }

    async index ({ request, params, view, response }) {
        if (params.course == undefined) {
            return response.send('Not Found', 404)
        }
        const course = await Course.findOrFail( params.course)
        const page = request.input('page', 1)
        const search = request.input('search', '')
        const state_id = request.input('state_id', 0)
        const date = request.input('date', '')
        const query = this.model.query().with('state').where('course_id', course.id)
        const states = (await State.all()).toJSON()
        states.push({ id : 0, name: 'Tất Cả'})
        if (search.length > 0) {
            query.where('name','LIKE', `%${search}%`)
        }
        if (date.length > 0) {
            const time = new Date(date)
            const startDate = time.setHours(0, 0, 0, 0)
            time = new Date(date)
            const endDate = time.setHours(24)
            query.where('created_at','>', startDate)
            .where('created_at','<', endDate)
        }
        if (state_id != 0) {
            query.where('state_id', state_id)
        }
        const list = await query.paginate(page)
        return view.render(`${this.prefix.view}.index`, { list : list.toJSON(), states, course: course.toJSON() })
    }


    async create ({ view, request, params , session }) {
        const states = await State.all();
        const roles = await Role.all();
        return view.render(`${this.prefix.view}.add`, {
            roles: roles.toJSON(),
        })
    }

    async store({ request, response, session, params }) {
        const data = request.only(this.model.dataSchema)
        const item = new this.model()
        item.fill(data)
        if (await item.save()) {
            session.flash({ notification: 'Tạo Mới Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`)
        }
        session.flash({ notification: 'Tạo Mới Không Thành Công', type: 'error' })
        return response.redirect('back')
    }

    async edit ({ request, params, view }) {
        const states = await State.all()
        const roles = await Role.all()
        const item = await this.getByIdWith(params)
        return view.render(`${this.prefix.view}.edit`, {
            item,
            states: states.toJSON(),
            roles: videos.toJSON()
        })
    }

    async update ({ request, params, response, session }) {
        if (params.course == undefined) {
            return response.send('Not Found', 404)
        }
        const course = await Course.findOrFail( params.course)
        const item = await this.getById(params)
        const data = request.only(this.model.dataSchema)
        await item.merge(data)
        if (await item.save()) {
            session.flash({ notification: 'Cập Nhập Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`, { course: course.id })
        }
        session.flash({ notification: 'Không Có Cập Nhập', type: 'error' })
        return response.redirect('back')
    }

    async destroy ({ request, params, response }) {
        if (params.course == undefined) {
            return response.send('Not Found', 404)
        }
        const course = await Course.findOrFail( params.course)
        const item = await this.getById(params)
        const _tags = await TagPost.query().where('post_id', item.id)
        if(await item.delete()) {
            session.flash({ notification: 'Xóa Thành Công', type: 'success' })
        } else {
            session.flash({ notification: 'Xóa Không Thành Công', type: 'error' })
        }
        return response.route(`${this.prefix.route}.index`, { course: course.id })
    }

    async getById({ id }) {
        return await this.model.findOrFail(id)
    }

    async getByIdWith({ id }) {
        const items = (await this.model.query()
            .with('state')
            .where('id', id).fetch()).toJSON()
        if (items.length > 0) {
            return items[0]
        }
        throw 'Not Found'
    }
}

module.exports = UserController
