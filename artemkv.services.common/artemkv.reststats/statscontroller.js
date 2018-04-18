"use strict";

const stats = require('./stats');
const statusCodes = require('@artemkv/statuscodes');
const statusMessages = require('@artemkv/statusmessages');
const RestError = require('@artemkv/resterror');

let _version = '0';

function getTimeDiffFormatted(before, now) {
    return getTimeIntervalFormatted(now - before);
}

function getTimeIntervalFormatted(interval) {
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_MINUTES = 60;

    if (!interval) {
        return '';
    }

    let diff = interval / 1000;

    let days = Math.floor(diff / SECONDS_IN_DAY);
    diff = diff - days * SECONDS_IN_DAY;

    let hours = Math.floor(diff / SECONDS_IN_HOUR);
    diff = diff - hours * SECONDS_IN_HOUR;

    let minutes = Math.floor(diff / SECONDS_IN_MINUTES);
    diff = diff - minutes * SECONDS_IN_MINUTES;

    let seconds = Math.floor(diff);

    return days + "." + hours + ":" + minutes + ":" + seconds;
}

const setVersion = function (version) {
    _version = version;
}

const getStats = function (req, res, next) {
    let statsData = stats.getStats();
    let now = new Date();

    let responses_history = { '1XX': 0, '2XX': 0, '3XX': 0, '4XX': 0, '5XX': 0 };
    for (let i = 0, len = statsData.history.length; i < len; i++) {
        let res_i = statsData.history[i];
        if (res_i.statusCode >= 500) {
            responses_history['5XX']++;
        } else if (res_i.statusCode >= 400) {
            responses_history['4XX']++;
        } else if (res_i.statusCode >= 300) {
            responses_history['3XX']++;
        } else if (res_i.statusCode >= 200) {
            responses_history['2XX']++;
        } else {
            responses_history['1XX']++;
        }
    }

    let last_1000_requests_within = '';
    let last_1000_requests_min_duration = 0;
    let last_1000_requests_max_duration = 0;
    let last_1000_requests_avg_duration = 0;
    if (statsData.history.length > 0) {
        last_1000_requests_within = getTimeDiffFormatted(statsData.history[0].time, statsData.history[statsData.history.length - 1].time);
        last_1000_requests_min_duration = statsData.history
            .map(function (statsData) { return statsData.duration })
            .reduce(function (acc, cur) { return Math.min(acc, cur); });
        last_1000_requests_max_duration = statsData.history
            .map(function (statsData) { return statsData.duration })
            .reduce(function (acc, cur) { return Math.max(acc, cur); });
        last_1000_requests_avg_duration = Math.floor(
            statsData.history
                .map(function (statsData) { return statsData.duration })
                .reduce(function (acc, cur) { return acc + cur; })
            / statsData.history.length
        );
    }

    let statsResult = {
        version: _version,
        uptime: getTimeDiffFormatted(statsData.started, now),
        time_since_last_request: getTimeDiffFormatted(statsData.previousRequestTime, now),

        requests_total: statsData.requestTotal,
        requests_by_endpoint: statsData.requestsByEndpoint,

        last_1000_requests: {
            done_within: last_1000_requests_within,
            min_duration: last_1000_requests_min_duration,
            max_duration: last_1000_requests_max_duration,
            avg_duration: last_1000_requests_avg_duration
        },

        shortest_interval_100_requests_received: getTimeIntervalFormatted(statsData.shortestSequenceTime),
        
        responses_all: statsData.responseStats,
        responses_last_1000: responses_history,

        requests_last_10: statsData.history
            .slice(-10)
            .map(function (statsData) {
                return {
                    url: statsData.url,
                    response: statsData.statusCode + " " + statsData.statusMessage,
                    duration: statsData.duration
                };
            }),
        failed_requests_last_10: statsData.historyOfFailed
            .slice(-10)
            .map(function (statsData) {
                return {
                    url: statsData.url,
                    response: statsData.statusCode + " " + statsData.statusMessage,
                    duration: statsData.duration
                };
            }),
        slow_requests_last_10: statsData.historyOfSlow
            .slice(-10)
            .map(function (statsData) {
                return {
                    url: statsData.url,
                    response: statsData.statusCode + " " + statsData.statusMessage,
                    duration: statsData.duration
                };
            })
    }

    let response = JSON.stringify(statsResult, null, 4);

    res.statusCode = statusCodes.OK;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.write(response);
    res.end();

    stats.countRequestByEndpoint("stats");
    stats.updateResponseStats(req, res);
}

exports.setVersion = setVersion;
exports.getStats = getStats;