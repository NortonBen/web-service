'use strict'

const Schema = use('Schema')

class LessonSchema extends Schema {
  up () {
    this.create('lessons', (table) => {
      table.increments()
      table.string('name', 500).notNullable()
      table.string('video', 500).notNullable()
      table.text('detail').notNullable()
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.integer('state_id').unsigned().references('id').inTable('states')
      table.integer('order_by').unsigned().defaultTo(1)
      table.boolean('pass_test').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('lessons')
  }
}

module.exports = LessonSchema
