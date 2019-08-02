
const Event = use('Event')
const Video = use('App/Models/Video')
const Logger = use('Logger')
const PoolService = use('PoolService')

class UpdateServiceChannel {


    handler(error, channel) {
        if(error) {
            Logger.error('connect RabbitMQ in UpdateServiceChannel fail')
            throw error
        }
        this.channelGetService(channel)
    }

    channelGetService(channel) {
        const ex = 'check_service';
        const result_ex = 'check_servicen_result';

        channel.channel.assertExchange(ex, 'fanout', {durable: false});
        channel.channel.assertExchange(result_ex, 'fanout', {durable: false});

        channel.channel.assertQueue('', {exclusive: true}, function(err, q) {
            if (err) {
                Logger.info('Error assertQueue %s' ,err)
                throw err
            }
            channel.channel.bindQueue(q.queue, result_ex, '');
            channel.consumeJson(q.queue, (data,msg) => {
                Logger.info('Info %j' , data)
                PoolService.update(data)
            }, {noAck: true});
        });

        Event.on('check:service', async (data) => {
            Logger.info("Check Service")
            channel.publishJson(ex, '',  {
                type: 'video_service'
            });
        })
    }
}


module.exports = UpdateServiceChannel