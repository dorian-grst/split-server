import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('split_id').references('id').inTable('splits').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
