'use strict'

const Model = use('Model')

class StateVideo extends Model {

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = StateVideo
