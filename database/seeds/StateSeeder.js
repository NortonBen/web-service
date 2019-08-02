'use strict'

/*
|--------------------------------------------------------------------------
| StateCourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const State = use('App/Models/State/State')

class StateSeeder {
  async run () {
    await State.findOrCreate({ id: 2 }, { id: 2, name: 'Trạng Thái Hiện' })
    await State.findOrCreate({ id: 3 }, { id: 3, name: 'Trạng Thái Ẩn' })
  }
}

module.exports = StateSeeder
