import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { scope } from '@ioc:Adonis/Lucid/Orm';
import Task from 'App/Models/Task';
import Status from 'Contracts/Enums/status'

export default class TasksController {
  public async index({}: HttpContextContract) {
    const tasksdb = await Database.from('tasks').where('status_id',Status.IDLE).select('*');
    const taskmodel = await Task.query().where('statusId',Status.IDLE).select('*');
    const userId = 2
    const incompleteTasks = await Task.query.apply(scopes=>scopes.incomplete(userId).createdThisMonth())
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
