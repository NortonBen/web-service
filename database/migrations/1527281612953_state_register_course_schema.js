'use strict'

const Schema = use('Schema')

class StateRegisterCourseSchema extends Schema {
  up () {
    this.create('state_register_courses', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_register_courses')
  }
}

module.exports = StateRegisterCourseSchema
