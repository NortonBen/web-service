'use strict'

const Post = use("App/Models/Post")
const Course = use("App/Models/Post")
const CategoryPost = use("App/Models/CategoryPost")
const CategoryCourse= use("App/Models/Category")

class HomeController {

    async postNew({ request }) {
        const list = await Post.query().where("state_id", 2)
            .orderBy('push', 'desc')
            .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
            .limit(15)
        return list
    }


    async post({ request, params }) {
        const { id }  = params;
        const list = await Post.query()
            .where("state_id", 2)
            .where("category_id", id)
            .orderBy('push', 'desc')
            .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
            .limit(10)
        return list
    }

    async courseNew({ request }) {
        const list = await Course.query().where("state_id", 2)
            .orderBy('push', 'desc')
            .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
            .limit(10)
        return list
    }

    async popularPost({ request }) {
        const page = request.input('page', 1)

        const list = await Post.query().where("state_id", 2)
            .orderBy('push', 'desc')
            .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
            .paginate(page)
        return list
    }

    async categoryPost() {
        const list = await CategoryPost.all()
        return list
    }

    async categoryCourse() {
        const list = await CategoryCourse.all()
        return list
    }
}

module.exports = HomeController
