import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {rules, schema} from '@ioc:Adonis/Core/Validator'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  public async index () {
    return User.all()
  }

  public async register ({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: await schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email'}),
      ]),
      password: await schema.string({}, [
        rules.confirmed()
      ])
    })
    const data = await request.validate({schema: validations})
    const user= await User.create({...data})
    await this.mailAssistant(user.email)
    return response.created(user)
  }
  public async extraVerification ({request, response}) {
    const email = request.input('email')
    await this.mailAssistant(email)
    return response.ok(email)
  }
  public async mailAssistant (email) {
    const signUrl = await Route.makeSignedUrl('verifyEmail',
      {
        email: email
      },
      {
        expiresIn: '2m'
      }
    )
    return await Mail.send((message) => {
      message
        .from('adonis&quasar-auth.com')
        .to(email)
        .subject('Welcome Onboard!')
        .htmlView('emails/welcome', {
          user: email,
          url: `http://localhost:3333${signUrl}`
        })
    })
  }
  public async verify ({ request, params, response }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      user.verified = true
      user.save()
      return response.ok(`The account ${ params.email } has been verified`)
    } else return 'Signature is missing or URL was tampered.'
  }
  public async login ({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    // Lookup user manually
    const user = await User
      .query()
      .where('email', email)
      .firstOrFail()

    // Verify password
    if (!user.verified) {
      return response.conflict('Unverified user')
    }
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }
    return await auth.use('api').generate(user)
    /*try {
      return await auth.use('api').attempt(email, password)
    } catch {
      return response.badRequest('Invalid credentials')
    }*/
  }

  public async logout ({ auth }: HttpContextContract) {
    const user = auth.user
    await auth.use('api').revoke()
    return {
      user: user,
      revoked: true
    }
  }
}
