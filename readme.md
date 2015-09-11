#Scheduler
Goodybag job scheduler (WIP)

## Setup
```
npm install -g phantomjs
npm install
npm test
```

todo: write a bash script

```
cd ./node_modules/cater
grunt namedModules
cd ..
grunt nameModules
```

open jobs admin UI http://localhost:8080

```
node server
```

## Example Enqueue

```js
var q = require('./lib/q');

q.create('build-pdf', {
  url: 'http://localhost:3000/orders/1234',
  output: 'foo',
  email: 'foo@test.com',
  password: 'bar'
}).save();
```



### Ideas

(optional) setting max # of parallel jobs based on job type

```
reminder-email :========== 20
send-sms       :======== 15
build-pdf      :==== 5
default        :=== 4
```
