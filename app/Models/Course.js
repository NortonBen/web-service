'use strict'

const Model = use('Model')

class Course extends Model {
    static get dataSchema () {
        return ['auth_id', 'id_number', 'name', 'image', 'description', 'detail', 'price', 'category_id', 'state_id']
    }

    user () {
        return this.belongsTo('App/Models/User', 'auth_id','id')
    }

    category () {
        return this.belongsTo('App/Models/Category', 'category_id','id')
    }

    state () {
        return this.belongsTo('App/Models/State/StateCourse', 'state_id', 'id')
    }

    tags () {
        return this.belongsToMany('App/Models/Tag', 'course_id', 'tag_id', 'id', 'id')
        .pivotTable('tag_courses')
    }
}

module.exports = Course
