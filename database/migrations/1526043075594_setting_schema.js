'use strict'

const Schema = use('Schema')

class SettingSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.string('name').primary()
      table.json('option')
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingSchema
