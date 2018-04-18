"use strict";

const CURIOSITY = 1000;
const CURIOSITY_FAILED = 100;
const CURIOSITY_SLOW = 100;
const SLOW_MS = 100;
const QUICK_SEQUENCE_SIZE = 100;

let _stats = {
    started: null,
    requestTotal: 0,
    requestsByEndpoint: {},
    responseStats: { '1XX': 0, '2XX' : 0, '3XX': 0, '4XX': 0, '5XX': 0 },
    currentRequestTime: null,
    previousRequestTime: null,
    history: [],
    historyOfFailed: [],
    historyOfSlow: [],
    shortestSequenceTime: null
};

const initialize = function() {
    _stats.started = new Date();
}

const countRequest = function() {
    _stats.requestTotal++;
    _stats.previousRequestTime = _stats.currentRequestTime;
    _stats.currentRequestTime = new Date();
}

const countRequestByEndpoint = function(endpoint) {
    if (!_stats.requestsByEndpoint[endpoint]) {
        _stats.requestsByEndpoint[endpoint] = 0;
    }
    _stats.requestsByEndpoint[endpoint]++;
}

const updateResponseStats = function(req, res) {
    let now = new Date();

    let responseStats = {
        time: req.requestTime,
        url: req.originalUrl,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        duration: now - req.requestTime
    }

    _stats.history.push(responseStats);
    if (_stats.history.length > CURIOSITY) {
        _stats.history.shift();
    }

    if (responseStats.statusCode >= 400) {
        _stats.historyOfFailed.push(responseStats);
        if (_stats.historyOfFailed.length > CURIOSITY_FAILED) {
            _stats.historyOfFailed.shift();
        }
    }

    if (responseStats.duration >= SLOW_MS) {
        _stats.historyOfSlow.push(responseStats);
        if (_stats.historyOfSlow.length > CURIOSITY_SLOW) {
            _stats.historyOfSlow.shift();
        }
    }
    
    if (res.statusCode >= 500) {
        _stats.responseStats['5XX']++;
    } else if (res.statusCode >= 400) {
        _stats.responseStats['4XX']++;
    } else if (res.statusCode >= 300) {
        _stats.responseStats['3XX']++;
    } else if (res.statusCode >= 200) {
        _stats.responseStats['2XX']++;
    } else {
        _stats.responseStats['1XX']++;
    }

    if (_stats.history.length >= QUICK_SEQUENCE_SIZE) {
        let lastSequenceTime = _stats.history[_stats.history.length - 1].time - 
            _stats.history[_stats.history.length - QUICK_SEQUENCE_SIZE].time;
        if(!_stats.shortestSequenceTime || _stats.shortestSequenceTime > lastSequenceTime) {
            _stats.shortestSequenceTime = lastSequenceTime;
        }
    }
}

const getStats = function() {
    return _stats;
}

exports.initialize = initialize;
exports.countRequest = countRequest;
exports.countRequestByEndpoint = countRequestByEndpoint;
exports.updateResponseStats = updateResponseStats;
exports.getStats = getStats;