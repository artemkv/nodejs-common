"use strict";

const stats = require('./stats');

const countRequest = function (req, res, next) {
    stats.countRequest();
    
    return next();
}

exports.countRequest = countRequest;