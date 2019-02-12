@artemkv/myrequest - Extra properties on request object
=======

```js
const http = require('http');
const connect = require('connect');
const myRequest = require('@artemkv/myrequest');

let server = connect();

server
    // Assemble my request
    .use(myRequest)
```

What you get:

```
function (req, res, next) {
    let query = req.my.query; // url query string
    let path = req.my.path; // url path
    let ip = req.my.ip; // request ip address
    let requestId = req.my.requestId; // unique request id
    let requestDateTime = req.my.requestTime; // request date and time
```