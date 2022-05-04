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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('/extraVerification', 'AuthController.extraVerification')
  Route.get('/verify/:email', 'AuthController.verify'
  ).as('verifyEmail')
  Route.get('/futureMail', async ({ view }) => {
    return view.render('emails/welcome', {
      user: 'Romualdo Gómez',
      url: 'http://localhost:8080/login'
    })
  })
  Route.get('/', 'AuthController.index')
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/secured', async () => {
    return {
      id: 1,
      account: 'CodeThirsty',
      type: 'secured',
      gender: true
    }
  }).middleware('auth')
}).prefix('api')

