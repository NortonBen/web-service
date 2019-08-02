'use strict'

const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.integer('id').unsigned().primary()
      table.date('brithday')
      table.integer('gender')
      table.string('avatar')
      table.foreign('id').references('id').inTable('users')
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
