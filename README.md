Restberry-Restify
=================

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
        var app = waf.app;
        var restify = waf.restify;
    }));
```
