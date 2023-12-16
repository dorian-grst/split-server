import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Split from 'App/Models/Split'
import { randomUUID } from 'node:crypto'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public userId: string

  @column()
  public payedById: string

  @column()
  public splitId: string

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => User)
  public payedBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  public payedFor: BelongsTo<typeof User>

  @belongsTo(() => Split)
  public split: BelongsTo<typeof Split>

  @beforeCreate()
  public static async generateUuid(model: Transaction) {
    model.id = randomUUID()
  }
}
