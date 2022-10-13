/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.group(()=>{
  Route.get('/','UsersController.index').as('index').namespace('App/Controllers/Http/Users')
  Route.get('/:id?','UsersController.show').as('show')
  Route.post('/','UsersController.store').as('store')
  Route.put('/','UsersController.update').as('update')
  Route.delete('/:id','UsersController.destroy').as('delete')
}).prefix('/users').as('users.')
Route.get('/testuser','UsersController.store');
Route.resource('projects','ProjectsController');
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.get('sendmail', 'UsersController.sendMail')
Route.get('helpersdemo', 'UsersController.helperDemo')

