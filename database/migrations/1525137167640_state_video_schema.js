'use strict'

const Schema = use('Schema')

class StateVideoSchema extends Schema {
  up () {
    this.create('state_videos', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.drop('state_videos')
  }
}

module.exports = StateVideoSchema
