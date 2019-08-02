'use strict'

const Schema = use('Schema')

class SocialSchema extends Schema {
  up () {
    this.create('socials', (table) => {
      table.integer('id').unsigned().primary()
      table.string('id_account');
      table.string('login_source');
      table.foreign('id').references('id').inTable('users')
    })
  }

  down () {
    this.drop('socials')
  }
}

module.exports = SocialSchema
