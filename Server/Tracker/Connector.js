const amqp = require('amqplib/callback_api');

/**
 * Establish connection between `Tracker` and other modules through `RabbitMQ`
 * @class
 */
function Connector()
{
    /**
     * Shows is connection and channel already established
     * @type {Boolean}
     */
    var prepared = false;

    /**
     * Channel from `Tracker` to `RabbitMQ`
     * @type {Object|Null}
     */
    var channel = null;

    /**
     * Sends data to queue if is possible
     * @param {*} data - what to send. will be converted to `String`
     */
    this.send = function(data)
    {
        if (prepared)
        {
            channel.sendToQueue('value', Buffer.from(String(data)));
        }
    }

    /**
     * Connectiong to message broker and creating channel
     */
    amqp.connect('amqp://localhost', (connectionError, connection) =>
    {
        connection.createChannel((channelError, newChannel) =>
        {
            newChannel.assertQueue('value', { durable: false });

            prepared = true;
            channel = newChannel;
        });
    });
}

module.exports = { Connector: Connector };
