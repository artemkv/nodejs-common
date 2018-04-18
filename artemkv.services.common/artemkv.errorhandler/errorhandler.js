"use strict";

const statusCodes = require('@artemkv/statuscodes');
const statusMessages = require('@artemkv/statusmessages');
const RestError = require('@artemkv/resterror');
const restStats = require('@artemkv/reststats');

var handleError = function (req, res, next) {
    throw new Error('Test error');
}

var handleRestError = function (req, res, next) {
    throw new RestError(statusCodes.NotImplemented, statusMessages.NotImplemented);
}

var handle404 = function (req, res, next) {
    throw new RestError(statusCodes.NotFound, statusMessages.NotFound);
}

var catchAll = function (err, req, res, next) {
    var statusCode = err.statusCode ? err.statusCode : statusCodes.InternalServerError;

    // TODO: add reference to the server log
    var error = { error: err.message };

    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(error));
    res.end();

    restStats.updateResponseStats(req, res);
}

exports.handleError = handleError;
exports.handleRestError = handleRestError;
exports.handle404 = handle404;
exports.catchAll = catchAll;