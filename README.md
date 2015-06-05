Restberry-Restify
=================

[![](https://img.shields.io/npm/v/restberry-restify.svg)](https://www.npmjs.com/package/restberry-restify) [![](https://img.shields.io/npm/dm/restberry-restify.svg)](https://www.npmjs.com/package/restberry-restify)

Restify wrapper for Restberry WAF. This package implements the WAF interface of
Restberry-Modules and can be used by Restberry.

## Install

```
npm install restberry-restify
```

## Usage

```
var restberryRestify = require('restberry-restify');

restberry
    .use(restberryRestify.use(function(waf) {
        var restify = waf.restify;
        var server = waf.server;
    }));
```
