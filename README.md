# rework-project

```
  npm install
  component install
  make build
```

Testing out Rework and Component working together instead of using Sass. Rework
is more of a post-processor for the CSS. It doesn't have a runtime and works in a
similar way to my old Scaffold project.

## Why?

The reason I'm testing these out is that I'm finding that in practice, most of the
Sass features are pointless and can be implemented in a simpler fashion. Now that
I'm writing CSS in a more modular fashion using things like BEM, there really
isn't that much I need Sass for.

For example, variables are usually only declared once in a single file, so why not just set them
in a config outside of the CSS and let the CSS keep its standard syntax?

Mixins are mostly used for vendor-prefixes, but with the autoprefixer node module
it handles all of the prefixing by parsing standard CSS syntax, so you can just code
as if the prefixes never existed.

Loops and conditionals in Sass are usually used in libraries that are generating CSS,
like grid frameworks. Again, this doesn't really need to live in the CSS, why not
just code it in JS in a language that is more flexible than a pseudo-language and
append that to the file?

I was struggling trying to make Sass modular enough to put into packages and handle
all the dependencies that one module might need (mixins, functions, variables etc).
However, I don't think this even needs to be done. CSS is very, very rarely shared
publicly as they are so tightly coupled with the design of the site. The only CSS
we need to share are abstract things like grid frameworks. The SUIT CSS components
are a perfect example.

These types of things don't really need mixins, variables or any other Sass feature.
If there are CSS components that do require logic, you can throw them in a JS
module on npm and access it with rework.

## Features

* Whitespace syntax
* Nested selectors
* Variables
* Custom functions
* Mixins
* Inline images
* Minifying via clean-css
* Plus a lot more...

## Component and Assets

The biggest benefit is that this all just works with Component. This means
we can write truly modular CSS packages. Just include all of the assets in a
component, like images, fonts etc and Component will take care of copying them
over to the build directory and rewriting all the urls.

## Config

The `config.js` file is just a function that is passed a rework object so you
can customize Rework per-project. If the build script could be wrapped up in a
module itself, we'd be left with a tiny module that just accepts CSS as input,
creates a rework object, passes it to the config, and then spits out CSS.

## TODO

Wrap this into a nicer API.
