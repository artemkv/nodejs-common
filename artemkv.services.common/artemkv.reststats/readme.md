@artemkv/reststats - REST Statistics
=======

```js
const http = require('http');
const connect = require('connect');
const restStats = require('@artemkv/reststats');

let server = connect();

server
    .use(restStats.countRequest)
	.use('/stats', restStats.getStats);
	
// Start the server
let env = process.env;
let port = env.NODE_PORT || 8000;
let ip = env.NODE_IP || 'localhost';
server.listen(port, ip, function () {
    console.log('Application started');
    console.log('http://' + ip + ":" + port + '/');
    restStats.initialize(version);
});

const getBook = function (req, res, next) {
	let book = catalog.getBook(bookId);
	response = JSON.stringify(book);

    res.statusCode = statusCodes.OK;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.write(response);
    res.end();

    restStats.countRequestByEndpoint("book");
    restStats.updateResponseStats(req, res);
}
```