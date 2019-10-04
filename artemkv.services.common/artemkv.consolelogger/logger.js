"use strict";

const logFailedRequest = function (req, res, err) {
    let requestId = req.my ? req.my.requestId : 'NO REQUEST ID';
    let requestTime = req.my ? req.my.requestTime.toISOString() : new Date().toISOString();

    let logLine = requestTime + ' ' + requestId + ' ' + err.statusCode + ' ' + err.statusMessage +
        ' ' + err.stack + '\n';

    console.log(logLine);
}

const log = function (msg) {
    let logLine = new Date().toISOString() + ' ' + msg + '\n';
    console.log(logLine);
}

const logSession = function (url) {
    let logLine = new Date().toISOString() + ' ' + url + '\n';
    console.log(logLine);
}

const initialize = function() {
}

exports.initialize = initialize;
exports.logFailedRequest = logFailedRequest;
exports.log = log;
exports.logSession = logSession;