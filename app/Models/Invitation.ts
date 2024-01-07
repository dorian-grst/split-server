import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany, beforeCreate, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import User from 'App/Models/User'
import Split from 'App/Models/Split'

export default class Invitation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public creatorId: string

  @column()
  public splitId: string

  @column()
  public token: string

  @column()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public creator: BelongsTo<typeof User>

  @belongsTo(() => Split)
  public split: BelongsTo<typeof Split>

  @manyToMany(() => Split)
  public splits: ManyToMany<typeof Split>

  @beforeCreate()
  public static async generateUuid(model: Invitation) {
    model.id = randomUUID()
  }
}
