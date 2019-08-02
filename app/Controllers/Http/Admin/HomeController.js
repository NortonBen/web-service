'use strict'

class HomeController {
    index({ view }) {
        return view.render('admin.index');
    }
}

module.exports = HomeController
