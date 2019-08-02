'use strict'

const Model = use('Model')

class Post extends Model {

    static get dataSchema () {
        return ['name','image', 'detail', 'state_id', 'description','push', 'category_id']
    }

    user () {
        return this.belongsTo('App/Models/User', 'auth_id','id')
    }

    category () {
        return this.belongsTo('App/Models/CategoryPost', 'category_id','id')
    }

    state () {
        return this.belongsTo('App/Models/State/StatePost', 'state_id', 'id')
    }

    tags () {
        return this.belongsToMany('App/Models/Tag', 'post_id', 'tag_id', 'id', 'id')
        .pivotTable('tag_posts')
    }
}

module.exports = Post
