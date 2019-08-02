'use strict'

const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('name', 500).notNullable()
      table.json('question').notNullable()
      table.json('answer').notNullable()
      table.integer('test_id').unsigned().references('id').inTable('tests')
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
