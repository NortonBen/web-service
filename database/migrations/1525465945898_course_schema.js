'use strict'

const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('id_number', 50).unique()
      table.string('name', 500)
      table.string('image', 500)
      table.text('description', 1500)
      table.text('detail')
      table.integer('price').unsigned()
      table.integer('state_id').unsigned().references('id').inTable('state_courses')
      table.integer('auth_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
