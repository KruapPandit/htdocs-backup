import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Project from 'App/Models/Project'
import User from 'App/Models/User';
import Status from 'Contracts/Enums/status';
import {schema,rules} from '@ioc:Adonis/Core/Validator'

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    //const projects = await Project.query('statusId',Status.IDLE);
    const projects = await Project.query().preload('tasks',query=>query.where('statusId',Status.COMPLETE));
    //const projects = Project.findMany([1,2]);
    return response.json({ projects });
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const validations = await schema.create({
      name: schema.string({}, [rules.minLength(3)]),
    })
    try {
      /**
       * Step 2 - Validate request body against
       *          the schema
       */
       const data1 = await request.validate({ schema: validations,messages: {
        required: 'The {{ field }} is required',
        'name.minLength': 'Name must be of minimum 3 character'
      } })
       console.log(data1);
   
       const data = request.only(['name']);
       const name = request.input('name');
       // const project = new Project();
       // project.name = 'P1';
       // await project.save();
   
       const user1 = await User.findOrFail(1);
   
       const project = await Project.create({ name });
       await project.related('users').attach({
         [user1.id]:{
           role_id:1
         }
       })
   
       await project.related('tasks').create({
         name:'Task 1',
         createdBy:user1.id
       })
   
       //const project = await Database.table('projects').insert({name});
   
       //const project = await Project.firstOrCreate({name:'p1'},{name:'p1',description:'D1'});
       //const project = await Project.updateOrCreate({name:'p1'},{name:'p1',description:'D11'});
       return response.json({ project });
    } catch (error) {
      /**
       * Step 3 - Handle errors
       */
      response.badRequest(error.messages)
    }

   
    
  }

  public async show({response,params}: HttpContextContract) {
    //const projects = await Project.query('id',params.id).first();
    //const projects = await Project.find(params.id);
    //const projects = await Project.findBy('statusId',Status.IDLE);
    const projects = await Database.from('projects').where('name',params.id).firstOrFail();

    //const projects = await Database.from('projects').where('name',params.id).where(query=>query.where('status_id',1).orWhere('status_id',2)).firstOrFail();

    // const ids = [1,2,3];
    // const projects = await Database.from('projects').whereIn('id',ids);

    //const projects = await Database.from('projects').where('name',params.id).orderby('name',asc).limit(3);

    //const projects = await Database.from('projects').where('name','LIKE','p4').firstOrFail();
    return response.json({ projects });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response, params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id);
    //project.name = request.input('name');
     const data = request.only(['name']);
     project.merge(data);
    await project.save();
    //await project.related('users').detach([2]);
    await project.related('users').sync([2]);
    //const project = await Database.from('projects').where('id',params.id).update(data);
    return response.json({ project });
  }

  public async destroy({ response, params }: HttpContextContract) {
    // const project = await Project.findOrFail(params.id);
    // project.delete();
    const project = await Database.from('projects').where('id',params.id).delete();
    return response.json({ project });
  }
}
