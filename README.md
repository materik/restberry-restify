Restberry-Restify
=================

[![](https://img.shields.io/npm/v/restberry-restify.svg)](https://www.npmjs.com/package/restberry-restify) [![](https://img.shields.io/npm/dm/restberry-restify.svg)](https://www.npmjs.com/package/restberry-restify)

Restberry WAF wrapper for restify.

## Install

```
npm install restberry-restify
```

## Usage

```
var restberryRestify = require('restberry-restify');

restberry
    .use('restify', function(waf) {
        var restify = waf.restify;
        var server = waf.server;
    });
```
