'use strict'

/*
|--------------------------------------------------------------------------
| StateCommentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const StateComment = use('App/Models/State/StateComment')

const Factory = use('Factory')

class StateCommentSeeder {
  async run () {
    await StateComment.findOrCreate({ id: 1 }, { id: 1, name: 'Hiện' })
    await StateComment.findOrCreate({ id: 2 }, { id: 2, name:  'Ấn' })
    await StateComment.findOrCreate({ id: 3 }, { id: 3, name:  'Span' })
  }
}

module.exports = StateCommentSeeder
