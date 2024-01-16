import Invitation from 'App/Models/Invitation'
import Notification from 'App/Models/Notification'
import Split from 'App/Models/Split'
import Transaction from 'App/Models/Transaction'
import SplitValidator from 'App/Validators/SplitValidator'

export default class SplitsController {
  async store({ auth, request, response }) {
    const user_id = auth.user.id
    const data = await request.validate(SplitValidator)
    const split = await Split.create({
      ...data,
      ownerId: user_id,
    })
    await split.related('users').attach([user_id])
    return response.status(200).json({ message: 'Split created successfully', split })
  }

  async index({ response }) {
    const splits = await Split.all()
    return response.send(splits)
  }

  async show({ response, params }) {
    const split = await Split.query()
      .where('id', params.id)
      .preload('users')
      .preload('transactions', (query) => {
        query.preload('payedBy')
        query.preload('payedFor')
      })
    return response.send(split)
  }

  async transactions({ params, response }) {
    const transactions = await Transaction.query().where('split_id', params.id).preload('payedBy')
    return response.send(transactions)
  }

  async invitations({ params, response }) {
    const invitations = await Invitation.query().where('split_id', params.id)
    return response.send(invitations)
  }

  async notifications({ params, response }) {
    const notifications = await Notification.query().where('split_id', params.id).preload('user')
    return response.send(notifications)
  }

  async join({ auth, request, response }) {
    const user = auth.user
    const { token } = request.only(['token'])
    const invitation = await Invitation.findByOrFail('token', token)
    await user.related('splits').attach([invitation.splitId])
    await invitation.delete()
    const split = await Split.query().where('id', invitation.splitId)
    return response.status(200).json({ message: 'Invitation accepted successfully', split })
  }

  async updateDisplayName({ params, request, response }) {
    const split = await Split.findOrFail(params.id)
    const { displayName } = request.only(['displayName'])
    split.displayName = displayName
    await split.merge({ displayName: displayName }).save()
    return response.status(200).json({ message: 'Displayname updated successfully', split })
  }

  async updateDescription({ params, request, response }) {
    const split = await Split.findOrFail(params.id)
    const { description } = request.only(['description'])
    split.description = description
    await split.merge({ description: description }).save()
    return response.status(200).json({ message: 'Description updated successfully', split })
  }
}
