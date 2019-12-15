#include <iostream>
#include <vector>
#include <memory>
#include <cassert>

class Buffer
{
    public:

        Buffer(size_t size) :
                m_data(size, 0),
                m_use(0)
        {}

        size_t write(const char* data, size_t size)
        {
            if (m_use == m_data.size())
            {
                return 0;
            }

            const size_t length = (size + m_use);
            size_t write =
                    length < m_data.size() ? size : m_data.size() - m_use;
            memcpy(m_data.data() + m_use, data, write);
            m_use += write;
            return write;
        }

        void drain()
        {
            m_use = 0;
        }

        size_t available() const
        {
            return m_use;
        }

        const char* data() const
        {
            return m_data.data();
        }

        void shl(size_t count)
        {
            assert(count<m_use);

            const size_t diff = m_use - count;
            std::memmove(m_data.data(), m_data.data()+count, diff);
            m_use = m_use - count;
        }

        void print()
        {
            for (int i = 0; i < m_use; i ++)
            {
                std::cout << m_data[i];
            }

            std::cout << std::endl;
        }

    private:

        std::vector<char> m_data;
        size_t m_use;
};
