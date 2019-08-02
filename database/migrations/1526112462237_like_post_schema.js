'use strict'

const Schema = use('Schema')

class LikePostSchema extends Schema {
  up () {
    this.create('like_posts', (table) => {
      table.string('id').primary()
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('id').inTable('posts')
      table.timestamps()
    })
  }

  down () {
    this.drop('like_posts')
  }
}

module.exports = LikePostSchema
