'use strict'

/*
|--------------------------------------------------------------------------
| StateLiveStreamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const StateLiveStream = use('App/Models/State/StateLiveStream')

class StateLiveStreamSeeder {
  async run () {
    await StateLiveStream.findOrCreate({ id: 1 }, { id: 1, name: 'Chờ Phát' })
    await StateLiveStream.findOrCreate({ id: 2 }, { id: 2, name: 'Đang Phát' })
    await StateLiveStream.findOrCreate({ id: 3 }, { id: 3, name: 'Tạm Dừng' })
    await StateLiveStream.findOrCreate({ id: 4 }, { id: 4, name: 'Kêt Thúc' })
  }
}

module.exports = StateLiveStreamSeeder
