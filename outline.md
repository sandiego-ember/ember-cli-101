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
0. Setup ember-data with our API endpoint? Or setup fixtures?
0. Blog post model
    0. Make a blog post model (using generator)
    0. Add logical fields to blog post model
    0. Write a test? Show that our model works in some other way?
0. Blog post route(s)
    0. Make a blog post route/template and test it out
    0. Make blog posts show up on the homepage?
0. Blog comment
    0. Make blog comment model and relate to post
    0. Make comments show up on blog post detail page
0. Submitting a comment
    0. Add form to submit a comment
