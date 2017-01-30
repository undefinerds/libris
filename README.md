# Libris

Virtual library for kids.

This project is using Electron, React, MongoDB and has almost everything you need just to start coding.

You need to install `mongoDB` and starts running at default port `mongodb://127.0.0.1:27017/`.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
  + [Start](#npm-start)
  + [Build](#npm-run-build)
  + [Electron](#npm-run-electron)
  + [Watch](#npm-run-watch)
  + [Electron-rebuild](#npm-run-electron-rebuild)
- [Folder Structure](#folder-structure)
- [Contribute](#something-missing)


## Installation

It needs MongoDB installed. You can install dependencies with `npm` but you can
also use `yarn` for it. This installation process uses `git`.

```

$ git clone https://github.com/undefinerds/libris.git
$ cd libris
$ npm install

```

And then you're ready.


## Scripts

For development we recommend run `npm run watch` and in another terminal `npm run electron` (until we handle different environments).

### npm start

And this build the bundle javascript file and run the electron app. It is the same as:

`$ npm run build && npm run electron`

### npm run build

Make a file called `bundle.js` inside the *./public* path.

### npm run electron

Starts the electron application with electron-prebuilt. If you have electron installed, this script works like:

`$ electron .`

We recommend using `electron-prebuilt` instead of `electron` package.

### npm run watch

Starts the `webpack-dev-server` with hot reloading. It seems like `npm run build` but it reloads the bundle.js file (and the app) when there is a change on the
JavaScript files.

### npm run electron-rebuild

Make all packages compatible with actual electron version, recommended running it after any npm package added to the repository.


## Folder Structure

After installation, your project should look like this:

```
libris/
  README.md
  LICENSE.md
  main.js
  webpack.base.js
  postcss.config.js
  package.json
  .babelrc
  .stylelintrc
  config.json
  yarn.lock
  node_modules/
  public/
    index.html
    favicon.ico
  javascripts/
    components/
    reducers/
    index.js
    actions.js
    config.js
    consts.js
    logo.svg
    routes.js
    store.js
  lib/
    async.js
    Book.js
    database.js
    db.js
    files.js
    init.js
    run.js
  stylesheets/
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template.
* `javascripts/index.js` is the JavaScript entry point.

You can delete or rename the other files.


## Something Missing?

Troubleshooting or if you have ideas, [let us know :smile:](https://github.com/undefinerds/libris/issues)
Do you wanna contribute? [Make a PR :heart:](https://github.com/undefinerds/libris/)