'use strict'

const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.string('ref', 500)
      table.text('text', 3000)
      table.integer('state_id').unsigned().references('id').inTable('state_comments')
      table.integer('auth_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
