
const RabbitMQ = use('RabbitMQ')


RabbitMQ.channel('App/Channels/ProcessVideoChannel')
RabbitMQ.channel('App/Channels/IdentificationChannel')
//RabbitMQ.channel('App/Channels/UpdateServiceChannel')