# React + Webpack Boilerplate

## What is this?

A flux-based online store.

Not to be confused with a Flux Store, which is Flux's answer to the model / collection aspect of MVC.

## Setup

First you will need to make sure you have the database up and running. First, run mongod using the local `db/` directory. Gulp is already set up to do this, so just run `gulp mongod`. Now either use something like Robomongo or simply create the db from the command line.


```
mongo
use flux-store
```

After you have the db create in your local `db/` folder you can run the app for development like so:

```
npm install
gulp
```
DefaultRoute

## Caveats of Alt

Note: Alt does some weird shit where you must call `this.actions.<method-name>`
order to access other actions defined on an action creators prototype. This
super unintuitive and not obvious. Pretty lame, but other than this I like A
so far.
