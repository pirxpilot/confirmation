
build: confirmation.css index.js confirmation.html components
	@component build --dev

components:
	@component install --dev

build-browserify: index.js confirmation.html node_modules
	@mkdir -p build
	@browserify \
		--require dialog \
		--require ./index.js:confirmation \
		--outfile build/build.js

clean:
	rm -fr build components

.PHONY: clean build

