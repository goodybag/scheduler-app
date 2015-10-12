#Scheduler App

```
npm install
npm run build
npm test
npm start [port] default port 8000
```

[http://localhost:8000/admin/scheduler](http://localhost:8000/admin/scheduler)

## API


    ENDPOINT             METHOD        OPERATION
    ------------------------------------------------------------
    /scheduler            GET          All scheduled jobs
    /scheduler/:job_id    GET          Get a scheduled job
    /scheduler/:job_id    PUT          Update a scheduled job


## Install within an Express app

1) add this repo to your package.json

```js
{
  "scheduler-app": "https://github.com/goodybag/scheduler-app.git"
}
```

2) register

```js
var schedulerApp = require('scheduler-app');
app.user(schedulerApp('postgres://localhost/cater'))