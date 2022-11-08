.Phony: start
start:
	web-ext run -s ./src

.Phony: build
build:
	npm run build
