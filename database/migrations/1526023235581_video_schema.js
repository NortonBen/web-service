'use strict'

const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.string('id').primary()
      table.string('name', 500).notNullable()
      table.string('path', 500).notNullable()
      table.string('content_type', 100).notNullable()
      table.integer('state_id').unsigned().references('id').inTable('state_videos')
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
