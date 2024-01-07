import Invitation from 'App/Models/Invitation'
import { DateTime } from 'luxon'

export default class InvitationsController {
  async store({ auth, request, response }) {
    const user = auth.user
    const split = await user
      .related('splits')
      .query()
      .where('splits.id', request.input('splitId'))
      .firstOrFail()
    const invitation = await Invitation.create({
      creatorId: user.id,
      splitId: split.id,
      token: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
      expiresAt: DateTime.now().plus({ days: 1 }),
    })
    return response.status(200).json({ message: 'Invitation created successfully', invitation })
  }

  async splitInvitations({ auth, request, response }) {
    const user = auth.user
    const invitations = await user
      .related('invitations')
      .query()
      .where('split_id', request.input('splitId'))
    return response.status(200).json({ invitations })
  }

  async delete({ params, response }) {
    const { token } = params
    const invitation = await Invitation.query().where('token', token).first()

    if (invitation) await invitation.delete()
    return response.status(200).json({ message: 'Invitation deleted successfully' })
  }
}
