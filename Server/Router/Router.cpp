#include <iostream>
#include <PoCo/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>

#include "./Server.hpp"
#include "./Connector.hpp"

/**
 * Provides web pages to client
 * Manages WebSocket connections and sending data
 */
int main()
{
    Server server(8000);
    server.start();
    
    ConnectionHandler handler("localhost", 5672);
    AMQP::Connection connection(&handler, AMQP::Login("guest", "guest"), "/");
    AMQP::Channel channel(&connection);

    channel.declareQueue("value");
    channel.consume("value", AMQP::noack).onReceived(
        [&](const AMQP::Message &message, uint64_t deliveryTag, bool redelivered)
        {
            int size = message.bodySize();
            char* data = new char[size + 1];

            for (int i = 0; i < size; i ++)
            {
                data[i] = message.body()[i];
            }

            data[size] = '\0';
            server.broadcastOnWS(data, size);

            std::cout << data << std::endl;
        });
    std::cout << "Set consumer" << std::endl;

    while (1)
    {
        handler.process();
    }

    server.stop();
    return 0;
}
