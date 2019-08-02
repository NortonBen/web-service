'use strict'

const Schema = use('Schema')

class StateCourseSchema extends Schema {
  up () {
    this.create('state_courses', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_courses')
  }
}

module.exports = StateCourseSchema
