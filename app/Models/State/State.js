'use strict'

const Model = use('Model')

class State extends Model {

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = State
