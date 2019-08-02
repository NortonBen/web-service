'use strict'

class AuthController {

    async login ({ auth, response, view }) {

        try {
            await auth.check()
            return response.route('admin.index')
        } catch (error) {
           
        }
        return view.render('auth.login')
      }

    async loginPost ({ request, auth, response, session }) {
        const { email, password, remember } = request.all()
        try {
            await auth
            .remember(remember == 'true')
            .attempt(email, password)
        }  catch (error) {
            session.flash({ message: 'Mât Khẩu hoặc tài khoản sai!' })
            return response.redirect('back')
        }

        return response.route('admin.index')
    }

    async logout({ auth, response }) {
        await auth.logout()
        return response.route('admin.login')
    }

}

module.exports = AuthController
