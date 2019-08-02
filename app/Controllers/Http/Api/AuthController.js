'use strict'
const User = use('App/Models/User')
const Social = use('App/Models/Social')
const Profile = use('App/Models/Profile')

class AuthController {
    async token({ request, auth, response }) {
      try {
        const user = await auth
          .authenticator('jwt')  
          .getUser()
        let _user = {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        }

        return _user;
      } catch (error) {
        response.status(401).send('invalid_token')
      }
    }

    async logout({ request, auth }) {
      await auth.logout()
      return {
        success: true,
      }
    }

    async login({ request, auth, response }) {
      const { email, password } = request.all()
      const token = await auth
        .authenticator('jwt')
        .attempt(email, password, true)
      return token
    }

    async facebook ({ ally, view }) {
      try {
        await auth.check()
        const user = await auth.getUser()
        const token = auth.authenticator('jwt')
          .generate(user)
        return view.render('windownLogin', { user, token })
      } catch(error) {
       
      }
     
      await ally.driver('facebook').redirect()
    }
    
    async facebookCallback ({ ally, auth, view }) {
      try {
        const fbUser = await ally.driver('facebook').getUser()

        let user = await User.findBy('email', fbUser.getEmail())

        if(user == null) {
              // user details to be saved
          const userDetails = {
            full_name: fbUser.getName(),
            email: fbUser.getEmail(),
            role_id: 3
          }
          user = new User();
          user.fill(userDetails);
          await user.save();

          const social = new Social();
          social.fill({
            id: user.id,
            id_account: fbUser.getId(),
            login_source: 'facebook',
          })
          await social.save();

          const profile = new Profile();
          profile.fill({
            id: user.id,
            avatar: fbUser.getAvatar()
          })

          await profile.save();
        }

        const token = await auth.authenticator('jwt')
          .generate(user)
  
        return view.render('windownLogin', { user, token  })
      } catch (error) {
        console.log(error)
        return 'Unable to authenticate. Try again later'
      }
    }
}

module.exports = AuthController
