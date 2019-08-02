'use strict'

const Model = use('Model')

class Comment extends Model {
    static get dataSchema () {
        return ['user_id', 'text', 'ref', 'state_id']
    }
}

module.exports = Comment
