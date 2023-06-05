import test from 'japa'
import supertest from 'supertest'
/*
{
  "users": {
    "id":       number,
    "email":    string,
    "username": string,
    "password": string,
    "avatar":   string
  }
}
*/
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
test.group('User', () => {
  test.only('it should create an user', async (assert) => {
    const userPayload = {
      email: 'test@test.com',
      username: 'test',
      password: 'test',
      avatar: 'https://avatars.githubusercontent.com/u/40671286?v=4',
    }
    const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(201)

    console.log(body)

    assert.exists(body.user, 'User undefined')
    assert.exists(body.user.id, 'Id undefined')
    assert.equal(body.user.email, userPayload.email)
    assert.equal(body.user.username, userPayload.username)
    assert.notExists(body.user.password, 'Password defined')
    assert.equal(body.user.avatar, userPayload.avatar)
  })
})
