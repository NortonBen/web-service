'use strict'

const Model = use('Model')

class Tag extends Model {
    
    static get dataSchema () {
        return ['name']
    }

    static get updatedAtColumn () {
        return null
    }
    static get createdAtColumn () {
        return null
    }

    static get visible () {
        return ['id','name']
      }

}

module.exports = Tag
