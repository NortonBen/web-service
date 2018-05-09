'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('name', 500)
      table.string('images', 500)
      table.text('description', 1500)
      table.text('detail')
      table.integer('state_id').unsigned().defaultTo(1)
      table.timestamps()
      table.foreign('state_id').references('state_posts.id')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
