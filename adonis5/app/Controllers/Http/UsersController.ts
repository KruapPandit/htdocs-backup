import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UsersService from 'App/services/UsersService';
import Mail from '@ioc:Adonis/Addons/Mail'
import { string } from '@ioc:Adonis/Core/Helpers'
import { HttpContext } from '@adonisjs/core/build/standalone';

export default class UsersController {
    public async index({ view }: HttpContextContract) {
        return view.render('users')
    }
    public async show({ response }: HttpContextContract){
        const test = UsersService.test();
        return response.json({ userId: test});
    }
    public async store(ctx:HttpContextContract){
        

        const user1 = {
            userName:'testuser1',
            email:'testuser1@gmail.com',
            password:'test123'
        }
        const user2 = {
            userName:'testuser2',
            email:'testuser2@gmail.com',
            password:'test123'
        }
        const users = await User.createMany([user1,user2]);
        return ctx.response.json({ users });
    }
    public async sendMail({}:HttpContextContract)
    {
          await Mail.send((message) => {
            message
              .from('info@example.com')
              .to('krupa.rwaltz@gmail.com')
              .subject('Welcome Onboard!')
              .htmlView('emails/recover')
          })
    }
    public async helperDemo({response}:HttpContextContract){
        
        const op = string.truncate('This is a very long, maybe not that long title',12, {completeWords: true,suffix: ' <a href="/1"> Read more </a>',} )// helloWorld
        console.log(op);
        return response.json({'string':op})
    }
}
