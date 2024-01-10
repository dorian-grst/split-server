// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Notification from 'App/Models/Notification'

export default class NotificationsController {
  public async store({ request }) {
    const { userId, splitId } = request.only(['userId', 'splitId'])
    const notification = await Notification.create({
      userId,
      splitId,
    })
    // await notification.load('user')
    return notification
  }

  async delete({ params, response }) {
    const { id } = params
    const notification = await Notification.findOrFail(id)
    await notification.delete()
    return response.status(200).json({ message: 'Notification deleted successfully' })
  }
}
