"use strict";

function getYearString(date) {
    return date.getUTCFullYear().toString();
}

function getMonthString(date) {
    let month = date.getUTCMonth() + 1;
    if (month < 10) {
        month = '0' + month.toString();
    } else {
        month = month.toString();
    }
    return month;
}

function getDayString(date) {
    let day = date.getUTCDate();
    if (day < 10) {
        day = '0' + day.toString();
    } else {
        day = day.toString();
    }
    return day;
}

function getHoursString(date) {
    let hours = date.getUTCHours();
    if (hours < 10) {
        hours = '0' + hours.toString();
    } else {
        hours = hours.toString();
    }
    return hours;
}

const getSortableDate = function () {
    let now = new Date();
    return getYearString(now) + getMonthString(now) + getDayString(now);
}

const getTimeStamp = function () {
    function pad(val) {
        if (val < 10) {
            return '0' + val.toString();
        } else {
            return val.toString();
        }
    }
    let now = new Date();
    let hours = pad(now.getUTCHours());
    let minutes = pad(now.getUTCMinutes());
    let seconds = pad(now.getUTCSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

exports.getYearString = getYearString;
exports.getMonthString = getMonthString;
exports.getDayString = getDayString;
exports.getHoursString = getHoursString;

exports.getSortableDate = getSortableDate;
exports.getTimeStamp = getTimeStamp;