'use strict'

const Schema = use('Schema')

class TagPostSchema extends Schema {
  up () {
    this.create('tag_posts', (table) => {
      table.integer('tag_id').unsigned()
      table.integer('post_id').unsigned()
      table.primary(['tag_id', 'post_id'])
      table.foreign('tag_id').references('id').inTable('tags')
      table.foreign('post_id').references('id').inTable('posts')

    })
  }

  down () {
    this.drop('tag_posts')
  }
}

module.exports = TagPostSchema
