export PATH:=$(shell pwd)/node_modules/.bin:$(shell pwd)/godeps/bin:$(PATH)
export GOPATH=$(shell pwd)/godeps

install:
	yarn install
	go get -u github.com/fogleman/primitive

build:
	rm -f packages/lazy-load/dist/*
	microbundle --cwd ./packages/lazy-load
	microbundle --cwd ./packages/demo 
	make placeholders

placeholders:
	make-placeholders packages/demo/images packages/demo/dist/images

watch:
	microbundle watch --cwd ./packages/demo 

serve:
	cd ./packages/demo && nodemon server.js --watch server.js
