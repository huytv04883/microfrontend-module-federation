.PHONY: install install-all dev build preview clean help

REACT_PORT  := 3001
VUE_PORT    := 3002
HOST_PORT   := 3000

## Install dependencies for all apps
install:
	npm i --prefix remote-react
	npm i --prefix remote-vue
	npm i --prefix host
	npm i

## Alias for install
install-all: install

## Start all apps in development mode (hot reload)
dev:
	npx concurrently \
		--names "REACT,VUE,HOST" \
		--prefix-colors "cyan,green,magenta" \
		"npm start --prefix remote-react" \
		"npm start --prefix remote-vue" \
		"npm start --prefix host"

## Build all apps for production
build:
	npm run build --prefix remote-react
	npm run build --prefix remote-vue
	npm run build --prefix host

## Serve production build (requires `serve`: npm i -g serve)
preview:
	npx concurrently \
		--names "REACT,VUE,HOST" \
		--prefix-colors "cyan,green,magenta" \
		"npx serve remote-react/dist -p $(REACT_PORT) --no-clipboard" \
		"npx serve remote-vue/dist   -p $(VUE_PORT)   --no-clipboard" \
		"npx serve host/dist         -p $(HOST_PORT)  --no-clipboard"

## Build then preview
build-preview: build preview

## Remove all dist folders
clean:
	rm -rf remote-react/dist remote-vue/dist host/dist

## Remove dist and node_modules
clean-all: clean
	rm -rf remote-react/node_modules remote-vue/node_modules host/node_modules node_modules

## Show available commands
help:
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "  install       Install dependencies for all apps"
	@echo "  dev           Start all apps in development mode"
	@echo "  build         Build all apps for production"
	@echo "  preview       Serve production builds locally"
	@echo "  build-preview Build then preview"
	@echo "  clean         Remove dist folders"
	@echo "  clean-all     Remove dist + node_modules"
	@echo ""
