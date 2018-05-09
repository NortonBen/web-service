'use strict'

const Schema = use('Schema')

class StatePostSchema extends Schema {
  up () {
    this.create('state_posts', (table) => {
      table.increments()
      table.string('name', 100)
    })
  }

  down () {
    this.drop('state_posts')
  }
}

module.exports = StatePostSchema
