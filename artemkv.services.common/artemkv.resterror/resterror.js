"use strict";

var RestError = function (statusCode, statusMessage) {
    // Without passing RestError to captureStackTrace, the RestError
    // frame would show up in the .stack property. By passing
    // the constructor, we omit that frame, and retain all frames below it.
    Error.captureStackTrace(this, RestError);
    
    this.name = RestError.name;
    this.message = statusMessage;

    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
};

module.exports = RestError;