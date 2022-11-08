.Phony: start
start:
	web-ext run -s ./src

.Phony: build
build:
	npm run build
.Phony: watch
watch:
	watchexec -e js,json npm run chrome
