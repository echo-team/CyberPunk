#include "FileMappingHandler.h"
#include <Windows.h>
#include <string>

FileMappingHandler::~FileMappingHandler()
{
	delete this;
}

FileMappingHandler::FileMappingHandler(std::string fileName)
{
	HANDLE hMapFile;
	LPCTSTR pBuf;
	int bufSize = 256;

	this->tFileName = new TCHAR[fileName.size() + 1];
	this->tFileName[fileName.size()] = 0;
	std::copy(fileName.begin(), fileName.end(), tFileName);

	this->hMapFile = CreateFileMapping(
		INVALID_HANDLE_VALUE,
		NULL,
		PAGE_READWRITE,
		0,
		bufSize,
		this->tFileName);

	if (this->hMapFile == NULL || this->hMapFile == INVALID_HANDLE_VALUE)
	{
		printf("Не может создать  отраженный в памяти объект (%d).\n",
			GetLastError());
		throw;
	}

	this->pBuf = (LPTSTR)MapViewOfFile(
		this->hMapFile,
		FILE_MAP_ALL_ACCESS,
		0,
		0,
		bufSize);

	if (this->pBuf == NULL)
	{
		printf("Представление проецированного файла не возможно (%d).\n",
			GetLastError());
		throw;
	}
}

void FileMappingHandler::writeFile(int number)
{
	CopyMemory((PVOID)this->pBuf, &number, sizeof(this->tFileName));
}

void FileMappingHandler::closeFile()
{
	UnmapViewOfFile(this->pBuf);
	CloseHandle(this->hMapFile);
	FileMappingHandler::~FileMappingHandler();
}
