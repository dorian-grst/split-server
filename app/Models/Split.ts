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

  @beforeCreate()
  public static async generateUuid(model: Split) {
    model.id = randomUUID()
  }
}
