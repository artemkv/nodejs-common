@artemkv/statuscodes - HTTP Status Codes
=======

```js
var statusCodes = require('./statuscodes');

var catchAll = function (err, req, res, next) {
    var statusCode = err.statusCode ? err.statusCode : statusCodes.InternalServerError;
}
```