'use strict'

const Schema = use('Schema')

class RegisterCourseSchema extends Schema {
  up () {
    this.create('register_courses', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('id').inTable('users')
      table.integer('course_id').unsigned()
      table.foreign('course_id').references('id').inTable('courses')
      table.integer('state_id').unsigned()
      table.foreign('state_id').references('id').inTable('state_register_courses')
      table.timestamps()
    })
  }

  down () {
    this.drop('register_courses')
  }
}

module.exports = RegisterCourseSchema
