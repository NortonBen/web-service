'use strict'

const Schema = use('Schema')

class StateLiveStreamSchema extends Schema {
  up () {
    this.create('state_live_streams', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_live_streams')
  }
}

module.exports = StateLiveStreamSchema
