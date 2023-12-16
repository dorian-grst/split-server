import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query()
    const transaction = await Transaction.query().preload('user')

    return response.send(users)
  }

  // public async show({ response, params }: HttpContextContract) {
  //   const user = await User.findOrFail(params.id)

  //   return response.send(user)
  // }
}
