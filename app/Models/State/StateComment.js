'use strict'

const Model = use('Model')

class StateComment extends Model {

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = StateComment
