'use strict'

const Schema = use('Schema')

class StatesSchema extends Schema {
  up () {
    this.create('states', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('states')
  }
}

module.exports = StatesSchema
