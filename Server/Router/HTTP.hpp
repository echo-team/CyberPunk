#include <cstdio>
#include <PoCo/URI.h>
#include <PoCo/Net/HTTPRequestHandler.h>
#include <PoCo/Net/HTTPRequestHandlerFactory.h>
#include <PoCo/Net/HTTPServerRequest.h>
#include <PoCo/Net/HTTPServerResponse.h>
#include <PoCo/Net/ServerSocket.h>

#include "../Common.hpp"

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
 * Creates HTTPRouter
 */
class HTTPRouterFactory : public Poco::Net::HTTPRequestHandlerFactory
{
    public:

        /**
         * Starts request handler
         * @param request - request from client
         */
        Poco::Net::HTTPRequestHandler* createRequestHandler(const Poco::Net::HTTPServerRequest&)
        {
            return new HTTPRouter;
        }
};
