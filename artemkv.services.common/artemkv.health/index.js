"use strict";

const health = require('./health');

exports.handleHealthCheck = health.handleHealthCheck;
exports.handleLivenessCheck = health.handleLivenessCheck;
exports.handleReadinessCheck = health.handleReadinessCheck;
exports.setIsReady = health.setIsReady;
exports.setLiveness = health.setLiveness;