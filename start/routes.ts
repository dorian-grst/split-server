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
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.group(() => {
    Route.post('/signup', 'AuthenticationController.signup')
    Route.post('/login', 'AuthenticationController.login')

    Route.group(() => {
      Route.post('/logout', 'AuthenticationController.logout')
      Route.get('/me', 'AuthenticationController.me')
    }).middleware('auth')
  }).prefix('/auth')

  Route.group(() => {
    Route.post('/split', 'SplitsController.store')
    Route.get('/split/:id', 'SplitsController.show')
    Route.get('/split/:id/transactions', 'SplitsController.transactions')
    Route.get('/split/:id/invitations', 'SplitsController.invitations')
    Route.post('/split/join', 'SplitsController.join')
    Route.patch('/split/:id/displayname', 'SplitsController.updateDisplayName')
    Route.patch('/split/:id/description', 'SplitsController.updateDescription')


    Route.get('/user/:id/splits', 'UsersController.splits')
    Route.patch('/user/:id', 'UsersController.updateDisplayName')

    Route.post('/transaction', 'TransactionsController.store')
    Route.delete('/transaction/:id/delete', 'TransactionsController.delete')

    Route.post('/split/:id/invitation', 'InvitationsController.store')
    Route.delete('/split/:id/invitation/:token', 'InvitationsController.delete')
  }).middleware('auth')
}).prefix('v1')
