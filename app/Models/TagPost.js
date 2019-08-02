'use strict'

const Model = use('Model')

class TagPost extends Model {
    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = TagPost
