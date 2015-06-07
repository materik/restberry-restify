var _ = require('underscore');
var bodyParser = require('body-parser');
var restify = require('restify');

var FORMATTER_JSON_KEY = 'application/json; q=0.4';

function RestberryRestify() {
    this._formatters = {};
    this.restify = restify;
    this.server = null;
};

RestberryRestify.prototype.delete = function() {
    var server = this.server;
    server.del.apply(server, arguments);
};

RestberryRestify.prototype.formatters = function() {
    this._formatters[FORMATTER_JSON_KEY] = function(req, res, data) {
        if (_.isError(data)) {
            return req._waf.handleRes(data, req, res);
        }
        var formatJSON = restify.formatters[FORMATTER_JSON_KEY];
        return formatJSON(req, res, data);
    };
    return this._formatters;
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

RestberryRestify.prototype.res = function(code, data) {
    this._res.json(code, data);
};

module.exports = exports = new RestberryRestify;
