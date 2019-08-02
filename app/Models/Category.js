'use strict'

const Model = use('Model')

class Category extends Model {
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

module.exports = Category
