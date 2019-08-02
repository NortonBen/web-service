'use strict'

const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name')
      table.string('permission')
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
