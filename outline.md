# Outline

0. Loosely guided by @abuiles book Ember-CLI 101 which you can get $10 off for San Diego Ember group: https://leanpub.com/ember-cli-101/c/san-diego-101
0. Goal: reduce the glue
    0. testing, asset compilation, compile & minify, etc
0. Ember-CLI
    0. Broccoli build tool, fast, with plugin system
    0. Qunit for testing
    0. ES6 modules transpiled to AMD
0. Best practices
    0. Code
        0. camelCase naming
        0. use modules, avoid globals
        0. reusable code → mixins, extend, add-ons
    0. Files
        0. kebab-case-naming.js
        0. children in subdirectory → `routes/invoices/edit.js` & `routes/invoices/new.js`
0. Setup
    0. Node.js
    0. NPM, not sudo
    0. `npm i -g ember-cli`
    0. `ember new project`
0. Project Organization: High level
    0. /app
    0. /tests
    0. bower.json
    0. package.json
0. Ready to code!
    0. `ember serve`
    0. http://localhost:4200

