// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Transaction from 'App/Models/Transaction'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {
  async store({ auth, request, response }) {
    const user_id = auth.user.id
    const data = await request.validate(TransactionValidator)
    const transaction = await Transaction.create({
      amount: data.amount,
      splitId: data.splitId,
      payedById: data.payedById,
      title: data.title,
      userId: user_id,
    })
    if (data.usersIds.length > 0) {
      await transaction.related('payedFor').sync(data.usersIds)
    } else {
      const split = await transaction.related('split').query()
      const users = await split[0].related('users').query()
      const usersIds = users.map((user) => user.id)
      await transaction.related('payedFor').sync(usersIds)
    }
    return response.status(200).json({ message: 'Split created successfully', transaction })
  }

  async delete({ params, response }) {
    const { id } = params
    const transaction = await Transaction.findOrFail(id)
    await transaction.delete()
    return response.status(200).json({ message: 'Transaction deleted successfully' })
  }
}
