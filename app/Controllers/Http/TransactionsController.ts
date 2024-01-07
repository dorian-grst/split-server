// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Transaction from 'App/Models/Transaction'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {
  async store({ auth, request, response }) {
    const user_id = auth.user.id
    const data = await request.validate(TransactionValidator)
    const transaction = await Transaction.create({
      ...data,
      userId: user_id,
    })
    return response.status(200).json({ message: 'Split created successfully', transaction })
    
  }
}
