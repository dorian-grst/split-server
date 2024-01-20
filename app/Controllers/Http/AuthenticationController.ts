import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthenticationController {
  async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.attempt(email, password)
      response.cookie('token', token.token, {
        httpOnly: true,
        secure: true,
      })
      return response.send({ message: 'Login successful', token })
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    response.clearCookie('token')
    return {
      revoked: true,
    }
  }

  async signup({ request, response }: HttpContextContract) {
    const data = await request.validate(AuthValidator)
    try {
      const user = await User.create(data)
      return response.send({ message: 'User created successfully', user })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  async me({ auth, response }: HttpContextContract) {
    const user = auth.user
    return response.send(user)
  }
}
