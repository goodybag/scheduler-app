#Scheduler
Goodybag job scheduler (WIP)

## Setup

```
npm install -g phantomjs
npm install
npm test
```

open jobs admin UI [http://localhost:8080](http://localhost:8080)

```
node server
```

## Example

### Server

```js
var q = require('./lib')
q.start();
```

### Client

```js
var scheduler = require('scheduler');

var jobData = {
  title: 'my job', // the title will dislay in Kue UI dashboard
  url: 'http://localhost:3000/orders/1234',
  output: 'foo',
  email: 'foo@test.com',
  password: 'bar'
};

scheduler.enqueue('build-pdf', new Date, jobData, function (error) {
  if (error) throw error;
});

// you can also interface with kue directly.
q.create('build-pdf', jobData).save();
```


### Ideas

(optional) setting max # of parallel jobs based on job type

```
reminder-email :========== 20
send-sms       :======== 15
build-pdf      :==== 5
default        :=== 4
```
