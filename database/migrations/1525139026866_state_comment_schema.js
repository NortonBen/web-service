'use strict'

const Schema = use('Schema')

class StateCommentSchema extends Schema {
  up () {
    this.create('state_comments', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_comments')
  }
}

module.exports = StateCommentSchema
