'use strict'

const Schema = use('Schema')

class CategoryPostSchema extends Schema {
  up () {
    this.create('category_posts', (table) => {
      table.increments()
      table.string('name', 100)
    })
  }

  down () {
    this.drop('category_posts')
  }
}

module.exports = CategoryPostSchema
