#include <string>

/**
 * Gets extension if requested file
 * @param path - path to file
 */
std::string getExtension(std::string path)
{
    int dotIndex = -1;

    for (int counter = path.length() - 1; counter >= 0 && dotIndex == -1; counter --)
    {
        if (path[counter] == '.')
        {
            dotIndex = counter;
        }
    }

    std::string extension;

    if (dotIndex == -1)
    {
        extension = "";
    }
    else
    {
        extension = path.substr(dotIndex + 1);
    }

    return extension;
}

/**
 * Gets suitable MIME type for responce
 * @param ext - extension of file preparing to be sent
 */
std::string getMediaType(std::string ext)
{
    if (ext == "html")
    {
        return "text/html";
    }
    else if (ext == "css")
    {
        return "text/css";
    }
    else if (ext == "js")
    {
        return "text/javascript";
    }
    else if (ext == "svg")
    {
        return "image/svg+xml";
    }
    else if (ext == "png")
    {
        return "image/png";
    }
    else if (ext == "jpeg" || ext == "jpg")
    {
        return "image/jpeg";
    }
}
