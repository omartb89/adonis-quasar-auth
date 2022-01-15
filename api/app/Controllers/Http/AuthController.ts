import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async index () {
    return User.all()
  }

  public async register ({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: await schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email'})
      ]),
      password: await schema.string({}, [
        rules.confirmed()
      ])
    })
    const data = await request.validate({schema: validations})
    const user = await User.create({...data})
    return response.created(user)
  }

  public async login ({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      return await auth.use('api').attempt(email, password)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
