import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeCreate,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'
import { randomUUID } from 'node:crypto'
import Split from './Split'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public displayName: string | null

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @manyToMany(() => Split)
  public splits: ManyToMany<typeof Split>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid(model: User) {
    model.id = randomUUID()
  }
}
