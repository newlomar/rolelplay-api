import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload = request.only(['email', 'username', 'password', 'avatar'])

    const userByEmail = await User.findBy('email', userPayload.email)

    if (userByEmail) return response.conflict({ message: 'email already in use' })

    const user = await User.create(userPayload)
    return response.created({ user })
  }
}
