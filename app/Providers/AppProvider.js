
const Fold = require('@adonisjs/fold')

class AppProvider extends Fold.ServiceProvider {

    register () {

    }

    boot () {
        const Route = this.app.use('Route')
        Route.RouteGroup.macro('as', function (prefix) {
            this._routes.forEach(route => {
                route.name = `${prefix}.${route.name}`
            });
        })
    }
}

module.exports = AppProvider