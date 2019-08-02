'use strict'

const Model = use('Model')

class Role extends Model {
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

module.exports = Role
