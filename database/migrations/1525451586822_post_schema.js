'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('name', 500)
      table.string('image', 500)
      table.text('description', 1500)
      table.text('detail')
      table.integer('category_id').unsigned().references('id').inTable('category_posts')
      table.integer('state_id').unsigned().references('id').inTable('state_posts')
      table.integer('auth_id').unsigned().references('id').inTable('users')
      table.date('push').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
