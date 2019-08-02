'use strict'

const Schema = use('Schema')

class TestSchema extends Schema {
  up () {
    this.create('tests', (table) => {
      table.increments()
      table.string('name', 500)
      table.text('detail').notNullable()
      table.integer('require').unsigned()
      table.integer('test_id').unsigned().references('id').inTable('tests')
      table.timestamps()
    })
  }

  down () {
    this.drop('tests')
  }
}

module.exports = TestSchema
