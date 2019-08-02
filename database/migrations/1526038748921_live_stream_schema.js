'use strict'

const Schema = use('Schema')

class LiveStreamSchema extends Schema {
  up () {
    this.create('live_streams', (table) => {
      table.string('id').primary()
      table.string('name', 500)
      table.string('image', 500)
      table.text('description', 1500)
      table.integer('state_id').unsigned().references('id').inTable('state_live_streams')
      table.integer('auth_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('live_streams')
  }
}

module.exports = LiveStreamSchema
