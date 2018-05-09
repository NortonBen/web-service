'use strict'

const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('path').notNullable()
      table.string('content-type').notNullable()
      table.string('folder').notNullable()
      table.timestamps()
      table.foreign('folder').references('folders.name')
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
