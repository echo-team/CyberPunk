#include <cstdio>
#include <PoCo/URI.h>
#include <PoCo/Net/HTTPRequestHandler.h>
#include <PoCo/Net/HTTPRequestHandlerFactory.h>
#include <PoCo/Net/HTTPServerRequest.h>
#include <PoCo/Net/HTTPServerResponse.h>
#include <PoCo/Net/ServerSocket.h>

#include "../Common.hpp"

using namespace Poco;
using namespace Poco::Net;

/**
 * Listen HTTP requests
 */
class HTTPRouter : public HTTPRequestHandler
{
    public:

        /**
         * Dispatches when new HTTP request passed
         * @param request  - request from client
         * @param responce - responce text sent to client
         */
        void handleRequest(HTTPServerRequest& request, HTTPServerResponse& response)
        {
            response.setStatus(HTTPResponse::HTTP_OK);

            std::string path = URI(request.getURI()).getPath();
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
class HTTPRouterFactory : public HTTPRequestHandlerFactory
{
    public:

        /**
         * Starts request handler
         * @param request - request from client
         */
        HTTPRequestHandler* createRequestHandler(const HTTPServerRequest&)
        {
            return new HTTPRouter;
        }
};
