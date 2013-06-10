install:
	@component install

build:
	@component build --use component-whitespace
	@node bin/reworker < build/build.css > build/build.min.css
	@node bin/reworker --variant ie8 < build/build.css > build/build.ie8.min.css
	@rm build/build.js

clean:
	@rm -rf build/

.PHONY: build