install:
	@component install

build:
	@component build --use component-whitespace
	@node tools/build.js < build/build.css > build/build.min.css
	@rm build/build.js

clean:
	@rm -rf components/ build/ node_modules/

.PHONY: build