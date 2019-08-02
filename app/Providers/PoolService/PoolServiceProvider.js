
const Fold = require('@adonisjs/fold')

class PoolServiceProvider extends Fold.ServiceProvider {
    _registerPool() {
        this.app.singleton('Norton/PoolService', (app) => {
            const PoolService = require('./PoolService')
            const Server = app.use('Adonis/Src/Server')
            return new PoolService(Server)
        })
        this.app.alias('Norton/PoolService', 'PoolService')
    }

    register () {
        this._registerPool()
    }

    boot () {
    
    }
}

module.exports = PoolServiceProvider