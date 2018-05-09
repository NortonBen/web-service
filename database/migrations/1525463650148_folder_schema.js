'use strict'

const Schema = use('Schema')

class FolderSchema extends Schema {
  up () {
    this.create('folders', (table) => {
      table.string('name').primary()
    })
  }

  down () {
    this.drop('folders')
  }
}

module.exports = FolderSchema
