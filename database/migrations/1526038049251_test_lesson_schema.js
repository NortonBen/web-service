'use strict'

const Schema = use('Schema')

class TestLessonSchema extends Schema {
  up () {
    this.create('test_lessons', (table) => {
      table.integer('test_id').unsigned()
      table.integer('lesson_id').unsigned()
      table.primary(['lesson_id', 'test_id'])
      table.foreign('test_id').references('id').inTable('tests')
      table.foreign('lesson_id').references('id').inTable('lessons')
    })
  }

  down () {
    this.drop('test_lessons')
  }
}

module.exports = TestLessonSchema
