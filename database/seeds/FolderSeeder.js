'use strict'

/*
|--------------------------------------------------------------------------
| FolderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Folder = use('App/Models/Folder')

class FolderSeeder {
  async run () {
    await Folder.findOrCreate({ name: '' })
  }
}

module.exports = FolderSeeder
