#Scheduler

Goodybag job scheduler powered by [kue](https://github.com/Automattic/kue)

## Setup

```
npm install -g phantomjs
npm install
npm test
```


start the scheduler server

```
node server
```
open jobs admin UI [http://localhost:8080](http://localhost:8080)

## Example

```js
var scheduler = require('scheduler');

var jobData = {
  title: 'my job', // the title will dislay in Kue UI dashboard
  url: 'http://localhost:3000/orders/1234',
  output: 'foo',
  email: 'foo@test.com',
  password: 'bar'
};

scheduler.enqueue('build-pdf', new Date(), jobData, function (error) {
  if (error) throw error;
});

// you can also interface with kue directly.
scheduler.create('build-pdf', jobData).save();
```

## Client API
When you `npm install scheduler` only the following methods will be available (along with the kue api). It should be noted that goodybag cater is a dev dependency and should remain a dev dependency to avoid costly production deploys.

#### .enqueue ( action, datetime, jobData, callback )
Adds a new job to the queue

#### .watchStuckActiveJobs ( sec, max )
Watch every `sec` seconds for jobs that have been in active state longer than `max` minutes.
Active jobs that exceed `max` minutes are set to 'inactive' (kue will attempt to reprocess).


### Ideas

(optional) setting max # of parallel jobs based on job type

```
reminder-email :========== 20
send-sms       :======== 15
build-pdf      :==== 5
default        :=== 4
```
