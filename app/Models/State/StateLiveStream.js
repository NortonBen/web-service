'use strict'

const Model = use('Model')

class StateLiveStream extends Model {

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }
}

module.exports = StateLiveStream
