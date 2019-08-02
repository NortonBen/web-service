'use strict'
const Post = use('App/Models/Post')
const TagPost = use('App/Models/TagPost')
const Tag = use('App/Models/Tag')
const StatePost = use('App/Models/State/StatePost')
const CategoryPost = use('App/Models/CategoryPost')

class PostController {
    constructor() {
        this.model = Post
        this.prefix =  {
            route: 'admin.posts',
            view: 'admin.post'
        }
    }

    async index ({ request, params, view }) {
        const page = request.input('page', 1)
        const search = request.input('search', '')
        const state_id = request.input('state_id', 0)
        const category_id = request.input('category_id', 0)
        const date = request.input('date', '')
        const query = this.model.query().with('user').with('state').with('category')
        const states = (await StatePost.all()).toJSON()
        const categories = (await CategoryPost.all()).toJSON()
        states.push({ id : 0, name: 'Tất Cả'})
        categories.push({ id : 0, name: 'Tất Cả'})
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
        if (category_id != 0) {
            query.where('category_id', category_id)
        }
        if (state_id != 0) {
            query.where('state_id', state_id)
        }
        const list = await query.paginate(page)
        return view.render(`${this.prefix.view}.index`, { list : list.toJSON(), states, categories })
    }


    async create ({ view, request, session }) {
        const states = await StatePost.all();
        const categories = await CategoryPost.all();
        const tags = await Tag.all();
        return view.render(`${this.prefix.view}.add`, {
            states: states.toJSON(),
            categories: categories.toJSON(),
            tags: tags.toJSON()
        })
    }

    async store({ request, response, session, auth }) {
        const data = request.only(this.model.dataSchema)
        const tags = request.input('tag_ids',[])
        const item = new this.model()
        item.fill(data)
        const user = await auth.user()
        item.user_id = user.id
        if (await item.save()) {
            await tags.map(async tag_id => {
                await TagPost.findOrCreate({ tag_id, post_id: item.id }, { tag_id, post_id: item.id  })
            });
            session.flash({ notification: 'Tạo Mới Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`, true)
        }
        session.flash({ notification: 'Tạo Mới Không Thành Công', type: 'error' })
        return response.redirect('back')
    }

    async edit ({ request, params, view }) {
        const states = await StatePost.all()
        const categories = await CategoryPost.all()
        const tags = await Tag.all();
        const item = await this.getByIdWith(params)
        item.tags = item.tags.map(tag => tag.id)
        return view.render(`${this.prefix.view}.edit`, {
            item,
            states: states.toJSON(),
            categories: categories.toJSON(),
            tags: tags.toJSON()
        })
    }

    async update ({ request, params, response, session }) {
        const item = await this.getById(params)
        const tags = request.input('tag_ids',[])
        const data = request.only(this.model.dataSchema)
        await item.merge(data)
        if (await item.save()) {
            const _tags = await TagPost.query().where('post_id', item.id)
            await _tags.map(async tag => {
                try {
                    await tag.delete()
                } catch(ex) {

                }
                
            });
            await tags.map(async tag_id => {
                await TagPost.findOrCreate({ tag_id, post_id: item.id }, { tag_id, post_id: item.id  })
            });

            session.flash({ notification: 'Cập Nhập Thành Công', type: 'success'  })
            return response.route(`${this.prefix.route}.index`, true)
        }
        session.flash({ notification: 'Không Có Cập Nhập', type: 'error' })
        return response.redirect('back')
    }

    async destroy ({ request, params, response }) {
        const item = await this.getById(params)
        const _tags = await TagPost.query().where('post_id', item.id)
        await _tags.map(async tag => {
            await tag.delete()
        });
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

    async getByIdWith({ id }) {
        const items = (await this.model.query()
            .with('tags')
            .where('id', id).fetch()).toJSON()
        if (items.length > 0) {
            return items[0]
        }
        throw 'Not Found'
    }
}

module.exports = PostController
