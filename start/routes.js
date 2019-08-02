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

Route.group(() => {
  Route.post('token', 'AuthController.token').as('login.token')
  Route.post('login', 'AuthController.login').as('login.login')
 
  Route.get('login/facebook', 'AuthController.facebook').as('login.facebook')
  Route.get('authenticated/facebook', 'AuthController.facebookCallback').as('login.facebook.callback')


  Route.get('post_new', 'HomeController.postNew')
  Route.get('post_new_with/:id', 'HomeController.post')
  Route.get('course_new', 'HomeController.courseNew')
  Route.get('popular_post', 'HomeController.popularPost')
  Route.get('category_post', 'HomeController.categoryPost')
  Route.get('category_course', 'HomeController.categoryCourse')

  Route.get('post/:id', 'PostController.detail')
}).prefix('api').namespace("Api").as("api")

Route.group(() => {
  Route.post('logout', 'AuthController.logout').as('login.logout')
}).prefix('api').middleware(['auth']).namespace("Api").as("api")




Route.on('/').render('home')




Route.group(() => {
    Route.get('courses/:course/lessons', 'LessonController.index').as('lessons.index')
    Route.get('courses/:course/lessons/create', 'LessonController.create').as('lessons.create')
    Route.post('courses/:course/lessons', 'LessonController.store').validator('Lesson').as('lessons.store')
    Route.get('courses/:course/lessons/:id', 'LessonController.show').as('lessons.show')
    Route.get('courses/:course/lessons/:id/edit', 'LessonController.edit').as('lessons.edit')
    Route.put('courses/:course/lessons/:id', 'LessonController.update').validator('Lesson').as('lessons.update')
    Route.delete('courses/:course/lessons/:id', 'LessonController.destroy').as('lessons.destroy')

    Route.resource('lessons', 'LessonController').validator(new Map([
      [['lessons.store'], ['Lesson']],
      [['lessons.update'], ['Lesson']]
    ]))
    Route.resource('posts', 'PostController').validator(new Map([
      [['posts.store'], ['Post']],
      [['posts.update'], ['Post']]
    ]))
    Route.resource('videos', 'VideoController').validator(new Map([
      [['videos.store'], ['Video']],
      [['videos.update'], ['Video']]
    ]))
    Route.resource('courses', 'CourseController').validator(new Map([
      [['courses.store'], ['Course']],
      [['courses.update'], ['Course']]
    ]))
    Route.resource('category_posts', 'CategoryPostController').validator(new Map([
        [['category_posts.store'], ['Category']],
        [['category_posts.update'], ['Category']]
      ]))
    Route.resource('tags', 'TagController').validator(new Map([
        [['tags.store'], ['Category']],
        [['tags.update'], ['Category']]
      ]))
    Route.resource('category_courses', 'CategoryCourseController').validator(new Map([
        [['category_courses.store'], ['Category']],
        [['category_courses.update'], ['Category']]
      ]))
    Route.get('media', 'FileController.index').as('file.media')
    Route.get('media/api', 'FileController.api').as('file.media.api')
    Route.post('media', 'FileController.upload').as('file.upload')
    Route.post('media/:id', 'FileController.delete').as('file.delete')

    Route.get('/', 'HomeController.index').as('index')
    Route.get('logout', 'AuthController.logout').as('logout')
}).prefix('admin').middleware(['auth']).namespace('Admin').as('admin')

Route.group(() => {
  Route.get('login', 'AuthController.login').as('login')
  Route.post('login', 'AuthController.loginPost').as('login.post')
}).prefix('admin').namespace('Admin').as('admin')

Route.get('file/:file', 'FileController.index').as('file')
Route.get('file/thumb/:file', 'FileController.thumb').as('file.thumb')