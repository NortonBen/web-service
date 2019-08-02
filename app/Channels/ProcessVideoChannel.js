
const Event = use('Event')
const Video = use('App/Models/Video')
const Logger = use('Logger')


class ProcessVideoChannel {

    handler(error, channel) {
        if(error) {
            Logger.error('connect RabbitMQ in ProcessVideoChannel fail')
            throw error
        }
        this.handleVideoChannel(channel)
    }

    handleVideoChannel(channel) {
        const queue = 'convert_video_queue'
        channel.channel.assertQueue('', {exclusive: true }, (error, q) => {
            if(error) {
                Logger.error('assertQueue to `convert_video_queue` fail error: %s', error)
                throw error
            }
            var correlationId = this.generateUuid()
            channel.consumeJson(q.queue, async ({ id }, msg) => {
                if (msg.properties.correlationId == correlationId) {
                    Logger.info('process video file with %s succcess', id)
                    await Video.query().where('id', id)
                        .update({ state_id: 2 })
                }
            }, {noAck: true})

            Event.on('handle::video', async (video) => {
                Logger.info('Video Convert %j', video)
                channel.sendJson(queue, video, { correlationId , replyTo: q.queue, persistent: true })
            })
        })
        
    }

    generateUuid() {
        return Math.random().toString() +
               Math.random().toString() +
               Math.random().toString();
      }
}


module.exports = ProcessVideoChannel