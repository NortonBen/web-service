'use strict'

const Post = use("App/Models/Post")

class PostController {

    async index({ request }) {
        const page = request.input('page', 1)

        const list = await Post.query().where("state_id", 2)

            .orderBy('push', 'desc')
            .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
            .paginate(page)
        return list
    }

    async detail({ request, params, response }) {
        const { id }  = params
        const post = await Post.query()
            .with('tags')
            .with('category')
            .with('user')    
            .where("state_id", 2)
            .where("id", id)
            .first()
        if (post == null || post == undefined) {
            return response.status(404).send({ messsage: 'not found'});
        }
        const most = await Post.query().where("state_id", 2)
                .orderBy('push', 'desc')
                .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
                .limit(10);
        const featured = await Post.query().where("state_id", 2)
                .orderBy('push', 'desc')
                .select('id', 'name', 'image', 'description', 'category_id', 'auth_id', 'push')
                .limit(10);
        return {
            post,
            most,
            featured
        }

    }

    async like({ request, auth, parmas }) {
        const { id }  = params;

    }
}

module.exports = PostController
