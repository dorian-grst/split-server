import User from 'App/Models/User'

export default class UsersController {
  async updateDisplayName({ auth, request, response }) {
    try {
      const user = await auth.user
      const { displayName } = request.only(['displayName'])
      user.displayName = displayName
      await user.merge({ display_name: displayName }).save()
      return response.status(200).json({ message: 'Displayname updated successfully', user })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async splits({ auth, response }) {
    try {
      const user = auth.user
      const splits = await user.related('splits').query()
      return response.status(200).json({ splits })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async index({ response }) {
    const users = await User.all()
    return response.send(users)
  }

  public async show({ response, params }) {
    const user = await User.findOrFail(params.id)
    return response.send(user)
  }
}
