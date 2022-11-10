# local
build:
	yarn run webpack && cp index.html public && cp node_modules/php-wasm/php-web.wasm public

# GitHub Pages
build_gh:
	yarn run webpack && cp public/bundle.js . && cp node_modules/php-wasm/php-web.wasm .

exec_all: build
	yarn serve