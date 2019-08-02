'use strict'

const Model = use('Model')

class LiveStream extends Model {
    static get dataSchema () {
        return ['name', 'auth_id', 'description', 'state_id', 'image']
    }
}

module.exports = LiveStream
