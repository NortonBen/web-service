'use strict'

const Model = use('Model')

class Video extends Model {
    static get dataSchema () {
        return ['name']
    }
    state () {
        return this.belongsTo('App/Models/State/StateVideo', 'state_id', 'id')
    }
}

module.exports = Video
