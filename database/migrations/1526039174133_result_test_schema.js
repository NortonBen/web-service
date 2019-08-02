'use strict'

const Schema = use('Schema')

class ResultTestSchema extends Schema {
  up () {
    this.create('result_tests', (table) => {
      table.increments()
      table.integer('scores').unsigned()
      table.json('result')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('test_id').unsigned().references('id').inTable('tests')
      table.timestamps()
    })
  }

  down () {
    this.drop('result_tests')
  }
}

module.exports = ResultTestSchema
