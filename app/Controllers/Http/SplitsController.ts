import Split from 'App/Models/Split'
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
      .preload('transactions')
    return response.send(split)
  }

  async transactions({ params, response }) {
    try {
      const split = await Split.findOrFail(params.id)
      const transactions = await split.related('transactions').query()
      return response.status(200).json({ transactions })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
