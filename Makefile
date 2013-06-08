install:
	@component install

build:
	@component build --use component-whitespace
	@node tools/build.js < build/build.css > build/build.compiled.css
	@rm build/build.js build/build.css
	@mv build/build.compiled.css build/build.css
	@node_modules/clean-css/bin/cleancss -o build/build.min.css build/build.css

clean:
	@rm -rf components/ build/ node_modules/

.PHONY: build