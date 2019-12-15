ENV=Test

EXTERNALS=../Externals
BUILD=../Build/$(ENV)
OBJECT=../Objects/$(ENV)
INCLUDE=-I$(EXTERNALS)/PoCo/include
INCLUDE+= -I$(EXTERNALS)/AMQP/include
LIB=-L$(EXTERNALS)/PoCo/lib
LIB+= -L$(EXTERNALS)/AMQP/lib

LIB_FLAG = -lPocoFoundation
LIB_FLAG += -lPocoXML -lPocoNet -lPocoUtil -lamqpcpp

.PHONY: Router Tracker Main

Router:
	g++ Router/Router.cpp -o $(BUILD)/Router $(INCLUDE) $(LIB) $(LIB_FLAG)
	cp $(EXTERNALS)/PoCo/lib/*.dll $(BUILD)/
	cp $(EXTERNALS)/AMQP/lib/*.dll $(BUILD)/

Tracker:
	cd Tracker && NODE_PATH=C:/Users/gigafiga21/AppData/Roaming/npm/node_modules npm run build

Main: Router Tracker
	g++ Main.cpp -o $(BUILD)/Main

all: Router Tracker

run:
	cd $(BUILD) && ./Main.exe
