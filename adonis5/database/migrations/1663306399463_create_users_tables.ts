import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      this.schema.createTable(this.tableName,(table)=>{
        table.increments('id').primary()
        table.string('userName',50).unique().notNullable()
        table.string('email',255).unique().notNullable()
        table.string('password',180).notNullable()
        table.string('remember_me_token').nullable()
        table.timestamps(true,true)

      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
