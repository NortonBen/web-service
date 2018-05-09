'use strict'

const Schema = use('Schema')

class StateCourseSchema extends Schema {
  up () {
    this.create('state_courses', (table) => {
      table.increments()
      table.string('name', 100)
    })
  }

  down () {
    this.drop('state_courses')
  }
}

module.exports = StateCourseSchema
