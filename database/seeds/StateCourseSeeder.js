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
const StateCourse = use('App/Models/State/StateCourse')

class StateCourseSeeder {
  async run () {
    await StateCourse.findOrCreate({ id: 1 }, { id: 1, name: 'Soạn Khóa Học' })
    await StateCourse.findOrCreate({ id: 2 }, { id: 2, name: 'Hiện Khóa Học' })
    await StateCourse.findOrCreate({ id: 3 }, { id: 3, name: 'Ẩn Khóa Học' })
  }
}

module.exports = StateCourseSeeder
