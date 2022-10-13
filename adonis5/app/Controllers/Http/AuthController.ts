// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"

export default class AuthController {
    public async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User();
        user.userName = username
        user.email = email
        user.password = password

        user = await user.save()
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
}
public async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({"user":user, "access_token": accessToken})
      }

    }
    catch (e) {
      return response.json({message: 'You first need to register!'})
    }
}
}
