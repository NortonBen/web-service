'use strict'

const Model = use('Model')

class Lesson extends Model {

    static get table() {
        return 'lessons'
    }

    static get dataSchema () {
        return ['name','video', 'detail', 'course_id', 'orderBy']
    }

    state () {
        return this.belongsTo('App/Models/State/State', 'state_id', 'id')
    }

}

module.exports = Lesson
