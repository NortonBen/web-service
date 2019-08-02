'use strict'

const Schema = use('Schema')

class PermissionRoleSchema extends Schema {
  up () {
    this.create('permission_roles', (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.integer('permission_id').unsigned().references('id').inTable('permissions')
      table.primary(['role_id', 'permission_id'])
    })
  }

  down () {
    this.drop('permission_roles')
  }
}

module.exports = PermissionRoleSchema
