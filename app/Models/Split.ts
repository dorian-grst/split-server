import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { randomUUID } from 'node:crypto'
import Transaction from './Transaction'
import Invitation from './Invitation'

export default class Split extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public displayName: string

  @column()
  public description: string | null

  @column()
  public archived: boolean

  @column()
  public ownerId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @manyToMany(() => Transaction)
  public transactions: ManyToMany<typeof Transaction>

  @manyToMany(() => Invitation)
  public invitations: ManyToMany<typeof Invitation>

  @beforeCreate()
  public static async generateUuid(model: Split) {
    model.id = randomUUID()
  }
}
