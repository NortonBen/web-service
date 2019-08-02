'use strict'
const CategoryPost = use('App/Models/CategoryPost')

class CategoryPostController {
    async index ({ request, params, view }) {
        const page = request.input('page', 1)
        const search = request.input('search', '')
        const query = CategoryPost.query();
        if (search.length > 0) {
            query.where('name','LIKE', `%${search}%`)
        }
        const list = await query.paginate(page)
        return view.render('admin.categoryPost.index', { list : list.toJSON() })
    }


    async create ({ view, request }) {
        return view.render('admin.categoryPost.add')
    }

    async store({ request, response, session }) {
        const data = request.only(CategoryPost.dataSchema)
        const item = new CategoryPost()
        item.fill(data)
        if (await item.save()) {
            session.flash({ notification: 'Tạo Mới Thành Công', type: 'success'  })
            return response.route('admin.category_posts.index', true)
        }
        session.flash({ notification: 'Tạo Mới Không Thành Công', type: 'error' })
        return response.redirect('back')
    }

    async edit ({ request, params, view }) {
        const item =  await CategoryPost.findOrFail(params.id)
        return view.render('admin.categoryPost.edit', { item: item.toJSON() })
    }

    async update ({ request, params, response, session }) {
        const item =  await CategoryPost.findOrFail(params.id)
        const data = request.only(CategoryPost.dataSchema)
        await item.merge(data)
        
        if (await item.save()) {
            session.flash({ notification: 'Cập Nhập Thành Công', type: 'success'  })
            return response.route('admin.category_posts.index', true)
        }
        session.flash({ notification: 'Không Có Cập Nhập', type: 'error' })
        return response.redirect('back')
    }

    async destroy ({ request, params, response }) {
        const item =  await CategoryPost.findOrFail(params.id)
        if(await item.delete()) {
            session.flash({ notification: 'Xóa Thành Công', type: 'success' })
        } else {
            session.flash({ notification: 'Xóa Không Thành Công', type: 'error' })
        }
        return response.route('admin.category_posts.index', true)
    }
}

module.exports = CategoryPostController
