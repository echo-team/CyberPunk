#include <cstdio>
#include <PoCo/URI.h>
#include <PoCo/Net/HTTPRequestHandler.h>
#include <PoCo/Net/HTTPRequestHandlerFactory.h>
#include <PoCo/Net/HTTPServerRequest.h>
#include <PoCo/Net/HTTPServerResponse.h>
#include <PoCo/Net/ServerSocket.h>
#include <PoCo/Net/WebSocket.h>

#include "../Common.hpp"

class HTTPRouterFactory;

struct Connection
{
        int id;
        Poco::Net::WebSocket socket;
};

class Server
{
    private:

        /**
         * Poco HTTP server instance
         */
        Poco::Net::HTTPServer* http;

        /**
         * Manage routers and connections
         */
        HTTPRouterFactory* routerFactory;

        /**
         * Next opened WS connection id
         */
        static int currentFreeId;
        static std::vector<Connection> wsOpenConnections;
        static Poco::Mutex wsOpenConnectionsLock;

    public:

        static void releaseWSConnection(int id);
        static void pushWSConnection(Poco::Net::WebSocket* socket);

        void broadcastOnWS(char* buffer, int size);
        void start();
        void stop();
        Server(int socket);
        ~Server();
};

std::vector<Connection> Server::wsOpenConnections;
Poco::Mutex Server::wsOpenConnectionsLock;
int Server::currentFreeId = 0;

/**
 * Listen HTTP requests
 */
class HTTPRouter : public Poco::Net::HTTPRequestHandler
{
    public:

        /**
         * Dispatches when new HTTP request passed
         * @param request  - request from client
         * @param responce - responce text sent to client
         */
        void handleRequest(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response)
        {
            response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);

            std::string path = Poco::URI(request.getURI()).getPath();
            std::string ext = getExtension(path);

            if (path == "/")
            {
                response.sendFile("./Pages/Main/Main.html", "text/html");
            }
            else
            {
                response.sendFile("./Pages/Main" + path, getMediaType(ext));
            }
        }
};

/**
 * Listen WebSocket requests
 */
class WSRouter : public Poco::Net::HTTPRequestHandler
{
    public:

        /**
         * Dispatches when new HTTP request passed
         * @param request  - request from client
         * @param responce - responce text sent to client
         */
        void handleRequest(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response)
        {
            Poco::Net::WebSocket* connection = new Poco::Net::WebSocket(request, response);
            Server::pushWSConnection(connection);
            char buffer[1024];
            int flags;

            while (true)
            {
                int size = connection->receiveFrame(buffer, sizeof(buffer), flags);

                if (size > 2 && buffer[0] == '$' && buffer[1] == 0)
                {
                    // TODO: unlimited WS connection id
                    Server::releaseWSConnection((int)buffer[2]);
                    return;
                }
            }
        }
};

/**
 * Creates HTTPRouter
 */
class HTTPRouterFactory : public Poco::Net::HTTPRequestHandlerFactory
{
    public:

        /**
         * Starts request handler
         * @param request - request from client
         */
        Poco::Net::HTTPRequestHandler* createRequestHandler(const Poco::Net::HTTPServerRequest& request)
        {
            if(request.find("Upgrade") != request.end() && Poco::icompare(request["Upgrade"], "websocket") == 0)
			    return new WSRouter;
		    else
			    return new HTTPRouter;
        }
};

/**
 * Sends message through all WebSocket connections
 * @param buffer - message to broadcast
 * @param size   - amount of bits in message
 */
void Server::broadcastOnWS(char* buffer, int size)
{
    Poco::ScopedLock<Poco::Mutex> lock(wsOpenConnectionsLock);

    for (std::vector<Connection>::iterator c = wsOpenConnections.begin(); c != wsOpenConnections.end(); c ++)
    {
        c->socket.sendFrame(buffer, size,  Poco::Net::WebSocket::FRAME_FLAG_FIN | Poco::Net::WebSocket::FRAME_OP_TEXT);
    }
}

/**
 * Adds new WebSocket connection
 * @param connection - new WS connection
 */
void Server::pushWSConnection(Poco::Net::WebSocket* socket)
{
    Poco::ScopedLock<Poco::Mutex> lock(wsOpenConnectionsLock);
    Connection connection = { currentFreeId, *socket };
    wsOpenConnections.push_back(connection);

    char buffer[4] = { '$', 0, (char)currentFreeId, '\0' };
    connection.socket.sendFrame(buffer, 4,  Poco::Net::WebSocket::FRAME_FLAG_FIN | Poco::Net::WebSocket::FRAME_OP_TEXT);
    currentFreeId ++;
}

void Server::releaseWSConnection(int id)
{
    Poco::ScopedLock<Poco::Mutex> lock(wsOpenConnectionsLock);
    std::vector<Connection>::iterator c = wsOpenConnections.begin();

    while (c != wsOpenConnections.end())
    {
        if (c->id == id)
        {
            wsOpenConnections.erase(c, c + 1);
            return;
        }

        c ++;
    }
}

void Server::start()
{
    this->http->start();
}

void Server::stop()
{
    this->http->stop();
}

Server::Server(int socket)
{
    this->routerFactory = new HTTPRouterFactory;
    this->http = new Poco::Net::HTTPServer(this->routerFactory, Poco::Net::ServerSocket(socket), new Poco::Net::HTTPServerParams);
}

Server::~Server()
{
    delete this->routerFactory;
    delete this->http;
}
