ENV=Test

EXTERNALS=../Externals
BUILD=../Build/$(ENV)
INCLUDE=-I$(EXTERNALS)/PoCo/include
LIB=-L$(EXTERNALS)/PoCo/lib

LIB_FLAG = -lPocoFoundation
LIB_FLAG += -lPocoXML -lPocoNet -lPocoUtil

all:
	g++ Router/Router.cpp -o $(BUILD)/Router $(INCLUDE) $(LIB) $(LIB_FLAG)
	cp $(EXTERNALS)/PoCo/lib/*.dll $(BUILD)/

run:
	cd $(BUILD) && ./Router.exe
