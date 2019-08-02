'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('App/Models/Role')

class RoleSeeder {
  async run () {
    await Role.findOrCreate({ id : 1}, { id: 1, name :"Quản Trị Viên" })
    await Role.findOrCreate({ id : 2}, { id: 2, name :"Quản Lý" })
    await Role.findOrCreate({ id : 3}, { id: 3, name :"Người Dùng" })
  }
}

module.exports = RoleSeeder
