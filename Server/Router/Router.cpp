#include <iostream>
#include <PoCo/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>

#include "./HTTP.hpp"

/**
 * Provides web pages to client
 * Manages WebSocket connections and sending data
 */
int main()
{
    HTTPServer http(new HTTPRouterFactory, ServerSocket(8000), new HTTPServerParams);
    http.start();

    bool run = true;

    while (run)
    {
        char* command;
        std::cin >> command;

        if (command == "stop")
        {
            run = false;
        }
    }

    http.stop();
    return 0;
}
