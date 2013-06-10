# rework-project

Testing out Rework and Component working together instead of using Sass. Rework
is more of a post-processor for the CSS. It doesn't have a runtime and works in a
similar way to my old Scaffold project.

## Usage

```
  npm install
  component install
  make build
```

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
* Generated grid classes, spacing classes and visibility classes
* Nested selectors
* Variables
* Custom functions
* Mixins
* Inline images
* Minifying via clean-css
* Plus a lot more...

## Component

When you need to pull in some third-party code, just use npm if it's a Rework
plugin or use Component if it's plain CSS. Rework plugins are for generated
CSS, like dynamic grids, whereas Component packages are for things like resets
and utility classes.

See the suitcss repos on Github for perfect examples of CSS packages.

## Assets

The biggest benefit is that this all just works with Component.

This means we can write truly modular CSS packages. Just include all of the assets in a
component, like images, fonts etc and Component will take care of copying them
over to the build directory and rewriting all the urls.

To see this in action, look a the local component `icons`. This is a Component
package. It has images and they are copied across during the build. I'm doing
this on a project at the moment with Sass but I'm relying on functions and variables
to get it done.

We're building things the same way you would build JS projects with Component,
and it's %$&%@$# awesome.

## Reworker

This CLI that lives in `/bin` that takes CSS as input and passes the Rework object and some options to
the `rework.js` file. It takes care of the whitespace syntax conversion and minification.

```
reworker < master.css > master.min.css --minify
```

Or change the config file

```
reworker < master.css --config config.js
```

### Sharing Modules

One great thing about this approach is that we are declaring the variables and the
breakpoints in JS and passing them to the CSS. This means we use this data on the
front-end.

For example, a breakpoint component on the client-side could require the breakpoints
object, add some window resize events and now both the CSS and JavaScript are using
the same breakpoints while only declaring them once.

## TODO

* Split out Reworker into a project
* Split fractional-widths, spacing, and visibility into projects
* Add a grunt task for Reworker