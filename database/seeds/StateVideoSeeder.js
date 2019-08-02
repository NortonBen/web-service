'use strict'

/*
|--------------------------------------------------------------------------
| StateLessonSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const StateVideo = use('App/Models/State/StateVideo')

class StateVideoSeeder {
  async run () {
    await StateVideo.findOrCreate({ id: 1 }, { id: 1, name: 'Đang Xử Lý' })
    await StateVideo.findOrCreate({ id: 2 }, { id: 2, name: 'Trạng Thái Hiện' })
    await StateVideo.findOrCreate({ id: 3 }, { id: 3, name: 'Trạng Thái Ẩn' })
  }
}


module.exports = StateVideoSeeder
