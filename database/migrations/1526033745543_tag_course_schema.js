'use strict'

const Schema = use('Schema')

class TagCourceSchema extends Schema {
  up () {
    this.create('tag_courses', (table) => {
      table.integer('tag_id').unsigned()
      table.integer('course_id').unsigned()
      table.primary(['tag_id', 'cource_id'])
      table.foreign('tag_id').references('id').inTable('tags')
      table.foreign('course_id').references('id').inTable('courses')
    })
  }

  down () {
    this.drop('tag_courses')
  }
}

module.exports = TagCourceSchema
