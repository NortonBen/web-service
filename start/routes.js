'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')




Route.group(() => { 
    Route.resource('posts', 'UserController')
    Route.get('media', 'FileController.index').as('admin.file.media')
    Route.get('media/api', 'FileController.api').as('admin.file.media.api')
    Route.post('media', 'FileController.upload').as('admin.file.upload')
    Route.post('media/:id', 'FileController.delete').as('admin.file.delete')
}).prefix('admin').namespace('Admin')

Route.get('file/:file', 'FileController.index').as('file')
Route.get('file/thumb/:file', 'FileController.thumb').as('file.thumb')