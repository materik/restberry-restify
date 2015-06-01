var _ = require('underscore');
var bodyParser = require('body-parser');
var errors = require('restberry-errors');
var restify = require('restify');
var modules = require('restberry-modules');


function RestberryRestify() {
    this.restify = restify;
    this.app = null;
};

RestberryRestify.prototype.__proto__ = modules.waf.prototype;

RestberryRestify.prototype.delete = function() {
    var app = this.app;
    app.delete.apply(app, arguments);
};

RestberryRestify.prototype.get = function() {
    var app = this.app;
    app.get.apply(app, arguments);
};

RestberryRestify.prototype.listen = function(port, next) {
    this.app.listen(port, next);
};

RestberryRestify.prototype.post = function() {
    var app = this.app;
    app.post.apply(app, arguments);
};

RestberryRestify.prototype.put = function() {
    var app = this.app;
    app.put.apply(app, arguments);
};

RestberryRestify.prototype.res = function(code, data) {
    this._res.status(code).json(data);
};

RestberryRestify.prototype.use = function(next) {
    var self = this;
    var app = restify();
    app.use(bodyParser.json());
    self.app = app;
    if (next)  next(self);
    return self;
};

module.exports = exports = new RestberryRestify;
