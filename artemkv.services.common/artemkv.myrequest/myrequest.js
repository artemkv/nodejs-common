"use strict";

const url = require('url');
const querystring = require('querystring');

const myRequest = function (req, res, next) {
    req.my = {};

    // Extract query string
    let req_url = url.parse(req.url, true);
    req.my.query = req_url.query;
    req.my.path = req_url.path;

    var ip = req.headers['x-forwarded-for'] || req.connection ? req.connection.remoteAddress : null;
    req.my.ip = ip;
    
    return next();
}

module.exports = myRequest;