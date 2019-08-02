'use strict'

const CategoryCourse = use('App/Models/Category')

class CategoryCourseController {

    constructor() {
        this.model = CategoryCourse
        this.prefix =  {
            route: 'admin.category_courses',
            view: 'admin.categoryCourse'
        }
    }

    async index ({ request, params, view }) {
        const page = request.input('page', 1)
        const search = request.input('search', '')
        const query = this.model.query();
        if (search.length > 0) {
            query.where('name','LIKE', `%${search}%`)
        }
        const list = await query.paginate(page)
        return view.render(`${this.prefix.view}.index`, { list : list.toJSON() })
    }


    async create ({ view, request }) {
        return view.render(`${this.prefix.view}.add`)
    }

    async store({ request, response, session }) {
        const data = request.only(this.model.dataSchema)
        const item = new this.model()
        item.fill(data)
        if (await item.save()) {
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

    async destroy ({ request, params, response }) {
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

module.exports = CategoryCourseController
