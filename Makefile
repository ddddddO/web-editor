build:
	yarn run webpack && cp index.html public && cp node_modules/php-wasm/php-web.wasm public

exec_all: build
	yarn serve