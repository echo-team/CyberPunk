#include <vector>
#include <cstring>
#include <iostream>
#include <amqpcpp.h>
#include <Poco/Net/StreamSocket.h>

#include "./Buffer.hpp"

#define BUFFER_SIZE 8388608
#define TEMP_BUFFER_SIZE 1048576

class ConnectionHandlerImpl
{
    public:

        Poco::Net::StreamSocket socket;
        bool connected;
        AMQP::Connection* connection;
        bool quit;
        Buffer inputBuffer;
        Buffer outBuffer;
        std::vector<char> tmpBuff;

        ConnectionHandlerImpl() :
                connected(false),
                connection(nullptr),
                quit(false),
                inputBuffer(BUFFER_SIZE),
                outBuffer(BUFFER_SIZE),
                tmpBuff(TEMP_BUFFER_SIZE)
        {}
};

class ConnectionHandler: public AMQP::ConnectionHandler
{
    public:

        ConnectionHandler(const std::string& host, uint16_t port)  :
            m_impl(new ConnectionHandlerImpl)
        {
            const Poco::Net::SocketAddress address(host, port);
            m_impl->socket.connect(address);
            m_impl->socket.setKeepAlive(true);
        }

        ~ConnectionHandler()
        {
            close();
        }

        void process()
        {
            try
            {
                if (m_impl->socket.available() > 0)
                {
                    size_t avail = m_impl->socket.available();
                    if(m_impl->tmpBuff.size()<avail)
                    {
                        m_impl->tmpBuff.resize(avail,0);
                    }

                    m_impl->socket.receiveBytes(&m_impl->tmpBuff[0], avail);
                    m_impl->inputBuffer.write(m_impl->tmpBuff.data(), avail);
                }
                if(m_impl->socket.available()<0)
                {
                    std::cerr<<"SOME socket error!!!"<<std::endl;
                }

                if (m_impl->connection && m_impl->inputBuffer.available())
                {
                    size_t count = m_impl->connection->parse(m_impl->inputBuffer.data(),
                            m_impl->inputBuffer.available());

                    if (count == m_impl->inputBuffer.available())
                    {
                        m_impl->inputBuffer.drain();
                    } else if(count >0 ){
                        m_impl->inputBuffer.shl(count);
                    }
                }
                sendDataFromBuffer();

            }
            catch (const Poco::Exception& exc)
            {
                std::cout << "Poco exception " << exc.displayText();
            }
        }

    private:

        void close()
        {
            m_impl->socket.close();
        };

        virtual void onData(AMQP::Connection *connection, const char *data, size_t size)
        {
            m_impl->connection = connection;
            const size_t writen = m_impl->outBuffer.write(data, size);
            if (writen != size)
            {
                sendDataFromBuffer();
                m_impl->outBuffer.write(data + writen, size - writen);
            }
        }

        void sendDataFromBuffer()
        {
            if (m_impl->outBuffer.available())
            {
                m_impl->socket.sendBytes(m_impl->outBuffer.data(), m_impl->outBuffer.available());
                m_impl->outBuffer.drain();
            }
        }

    private:

        std::shared_ptr<ConnectionHandlerImpl> m_impl;
};
