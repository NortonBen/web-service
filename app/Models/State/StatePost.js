'use strict'

const Model = use('Model')

class StatePost extends Model {

    static get table () {
        return 'state_posts'
    }

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = StatePost
