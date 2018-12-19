@artemkv/readjsonstream - Constructs object from Json stream
=======

```js
const MAX_LENGTH = 512;

const readJsonStream = require('@artemkv/readjsonstream');

function (req, res, next) {
    if (req.method !== 'POST') {
        throw new RestError(statusCodes.MethodNotAllowed, statusMessages.MethodNotAllowed);
    }
    let contentType = req.headers['content-type'];
    if (contentType !== 'application/json') {
        throw new RestError(statusCodes.BadRequest, statusMessages.BadRequest);
    }

    let promise = new Promise(readJsonStream(req, MAX_LENGTH));

    promise
        .then(function (data) {
            console.log(data);

            res.statusCode = statusCodes.OK;
            res.end();
        })
        .catch(function (err) {
            next(err);
        });
}
```