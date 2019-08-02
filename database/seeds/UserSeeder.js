'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    const password =  await Hash.make('1234');
    await User.findOrCreate({ id: 1}, {
      id: 1, full_name: 'Admin',
      email: 'norton0395@gmail.com',
      password,
      brithday: Date.now(),
      gender: 1,
      role_id: 1
    })
  }
}

module.exports = UserSeeder
