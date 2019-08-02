
class PoolService {
    /*
        item
        {
            id: Env.get('APP_KEY'),
            cpus: os.cpus(),
            freemem: os.freemem(),
            host: Env.get('APP_URL'),
            connect: Server.getInstance()._connections,
            type: 'video_service'
        }

    */
    constructor(Server) {
        this._pool = {}
        this._call = null

        Server.getInstance().on('listening', () => {
            setTimeout(() => {
                this.loopService()
            }, 10000)
        })
    }

    getVideo() {
        return this._getService('video_service')
    }

    addCall(call) {
        this._call = call
    }

    loopService() {
        this.deleteService()
        if (this._call != null) {
            this._call()
        }
        setTimeout(() => {
            this.loopService()
        }, 10000);
    }

    deleteService() {
        for(const type in this._pool) {
            for(const app_id in  this._pool[type]) {
                for(const id in this._pool[type][app_id]) {
                    const timeService = this._pool[type][app_id][id].time
                    if (timeService < Date.now()) {
                        this._pool[type][app_id][id] = null
                        delete this._pool[type][app_id][id]
                    }
                }
            }
        }
      
    }

    _getService(type) {
        let services = []
        for(const app_id in  this._pool[type]) {
            const _service = {
                app_id,
                cpus: 1,
                host: '',
                connect: 0,
            }
            for(const id in this._pool[type][app_id]) {
                const service = this._pool[type][app_id][id]
                if (service != null) {
                    _service.cpus = service.cpus
                    _service.host = service.host
                    _service.connect += service.connect
                }
            }
            if (_service.host != '') {
                services.push(_service)
            }
        }

        if (services.length < 1) {
            return null
        }
        services = services.sort((a, b) => {
            return (a.connect/a.cpus) > (b.connect/a.cpus)
        })
        return services[0]
    }

    getLiveStream() {
        return this._getService('live_stream_service')
    }
    
    update(service) {
        if (this._pool[service.type] === undefined) {
            this._pool[service.type] = {}
        }
        if (this._pool[service.type][service.app_id] != undefined) {
            this._pool[service.type][service.app_id][service.id] = { ...service, time: (Date.now() + 20000) }
        }  else {
            this._pool[service.type][service.app_id] = {}
            this._pool[service.type][service.app_id][service.id] = { ...service, time: (Date.now() + 20000) }
        }
       
    }

}

module.exports = PoolService