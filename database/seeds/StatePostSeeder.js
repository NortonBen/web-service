'use strict'

/*
|--------------------------------------------------------------------------
| StatePostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const StatePost = use('App/Models/State/StatePost')

class StatePostSeeder {
  async run () {
    await StatePost.findOrCreate({ id: 1 }, { id: 1, name: 'Bài Viết Nháp' })
    await StatePost.findOrCreate({ id: 2 }, { id: 2, name: 'Hiển Bài Viết' })
    await StatePost.findOrCreate({ id: 3 }, { id: 3, name: 'Ẩn Bài Viết' })
  }
}

module.exports = StatePostSeeder
