"use strict";

const statusCodes = require('@artemkv/statuscodes');

let _isReady = false;
let _isAlive = true;

const handleHealthCheck = function handleHealthCheck(req, res, next) {
    res.statusCode = statusCodes.OK;
    res.end();
}

const handleLivenessCheck = function handleLivenessCheck(req, res, next) {
    if (_isAlive) {
        res.statusCode = statusCodes.OK;
    } else {
        res.statusCode = statusCodes.InternalServerError;
    }
    res.end();
}

const handleReadinessCheck = function handleReadinessCheck(req, res, next) {
    if (_isReady) {
        res.statusCode = statusCodes.OK;
    } else {
        res.statusCode = statusCodes.ServiceUnavailable;
    }
    res.end();
}

const setIsReady = function() {
    _isReady = true;
}

const setLiveness = function(isAlive) {
    _isAlive = isAlive;
}

exports.handleHealthCheck = handleHealthCheck;
exports.handleLivenessCheck = handleLivenessCheck;
exports.handleReadinessCheck = handleReadinessCheck;
exports.setIsReady = setIsReady;
exports.setLiveness = setLiveness;