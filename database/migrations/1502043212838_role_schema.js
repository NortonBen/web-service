'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name', 100)
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
