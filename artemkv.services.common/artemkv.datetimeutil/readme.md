@artemkv/datetimeutil - Utilities for working with date and time
=======

```js
const dateTimeUtil = require('@artemkv/datetimeutil');

console.log(`${dateTimeUtil.getTimeStamp()} Application started`);

let fileName = './logs/' + dateTimeUtil.getSortableDate() + '.log';
```