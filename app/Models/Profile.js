'use strict'

const Model = use('Model')

class Profile extends Model {

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = Profile
