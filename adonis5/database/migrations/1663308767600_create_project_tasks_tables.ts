import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjectTasks extends BaseSchema {
  protected tableName = 'project_task'

  public async up () {
    this.schema.createTable(this.tableName,(table)=>{
      table.increments('id').primary()
      table.integer('sort_order').unsigned().notNullable().defaultTo(0)
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
      table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
