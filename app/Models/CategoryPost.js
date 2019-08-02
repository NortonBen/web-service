'use strict'

const Model = use('Model')

class CategoryPost extends Model {
    static get dataSchema () {
        return ['name']
    }

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = CategoryPost
