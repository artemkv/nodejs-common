"use strict";

const stats = require('./stats');
const statsController = require('./statscontroller');
const restStats = require('./reststats');

const initialize = function(version) {
	stats.initialize();
	statsController.setVersion(version);
}

exports.initialize = initialize;
exports.countRequestByEndpoint = stats.countRequestByEndpoint;
exports.updateResponseStats = stats.updateResponseStats;
exports.countRequest = restStats.countRequest;
exports.getStats = statsController.getStats;