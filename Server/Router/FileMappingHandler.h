#ifndef _FILEMAPPINGHANDLER_H_
#define _FILEMAPPINGHANDLER_H_

#include <Windows.h>
#include <string>

class FileMappingHandler 
{
	/* 
	* FileMappingHandler helps to interact with FileMapping mechanism
	*/
private:
	TCHAR* tFileName;
	HANDLE hMapFile;
	LPCTSTR pBuf;
public:
	/* 
	* type a name for your file, which should be mapped, in the constructor
	*/
	FileMappingHandler(std::string fileName);

	~FileMappingHandler();

	/* 
	* write a number to file
	*/
	void writeFile(int number);

	/* 
	* close file
	*/
	void closeFile();
};

#endif 
