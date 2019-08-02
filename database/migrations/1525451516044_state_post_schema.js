'use strict'

const Schema = use('Schema')

class StatePostSchema extends Schema {
  up () {
    this.create('state_posts', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_posts')
  }
}

module.exports = StatePostSchema
