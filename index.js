var _ = require('underscore');
var bodyParser = require('body-parser');
var errors = require('restberry-errors');
var restify = require('restify');
var modules = require('restberry-modules');

var FORMATTER_JSON_KEY = 'application/json; q=0.4';

function RestberryRestify(req, res) {
    this.setReqAndRes(req, res);
    this.restify = restify;
    this.server = null;
};

RestberryRestify.prototype.__proto__ = modules.waf.prototype;

RestberryRestify.prototype.delete = function() {
    var server = this.server;
    server.del.apply(server, arguments);
};

RestberryRestify.prototype.formatters = function() {
    var self = this;
    var formatters = {};
    formatters[FORMATTER_JSON_KEY] = function(req, res, data) {
        if (_.isError(data)) {
            return self.handleRes(data, req, res);
        }
        var formatJSON = restify.formatters[FORMATTER_JSON_KEY];
        return formatJSON(req, res, data);
    };
    return formatters;
};

RestberryRestify.prototype.get = function() {
    var server = this.server;
    server.get.apply(server, arguments);
};

RestberryRestify.prototype.listen = function(port, next) {
    this.server.listen(port, next);
};

RestberryRestify.prototype.post = function() {
    var server = this.server;
    server.post.apply(server, arguments);
};

RestberryRestify.prototype.put = function() {
    var server = this.server;
    server.put.apply(server, arguments);
};

RestberryRestify.prototype.use = function(next) {
    var self = this;
    var server = restify.createServer({
        formatters: self.formatters(),
    });
    server.use(bodyParser.json());
    server.use(restify.queryParser());
    self.server = server;
    if (next)  next(self);
    return self;
};

module.exports = exports = new RestberryRestify;
