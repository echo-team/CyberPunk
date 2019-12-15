#include <iostream>
#include <PoCo/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>

#include "./HTTP.hpp"
#include "./Connector.hpp"

/**
 * Provides web pages to client
 * Manages WebSocket connections and sending data
 */
int main()
{
    Poco::Net::HTTPServer http(new HTTPRouterFactory, Poco::Net::ServerSocket(8000), new Poco::Net::HTTPServerParams);
    http.start();

    
    ConnectionHandler handler("localhost", 5672);
    AMQP::Connection connection(&handler, AMQP::Login("guest", "guest"), "/");
    AMQP::Channel channel(&connection);

    channel.declareQueue("value");
    channel.consume("value", AMQP::noack).onReceived(
        [](const AMQP::Message &message, uint64_t deliveryTag, bool redelivered)
        {
            char* data = new char[message.bodySize() + 1];
            for (int i = 0; i < message.bodySize(); i ++)
            {
                data[i] = message.body()[i];
            }

            data[message.bodySize()] = '\0';

            std::cout << data << std::endl;
        });

    while (1)
    {
        handler.process();
    }

    http.stop();
    return 0;
}
