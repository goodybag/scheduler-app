#Scheduler App
An express application for monitoring job statuses

```
npm install
npm run build
npm test
npm start
```

[http://localhost:8000/admin/scheduler-app](http://localhost:8000/admin/scheduler-app)

## API


    ENDPOINT             METHOD        OPERATION
    ------------------------------------------------------------
    /api/jobs            GET          All scheduled jobs
    /api/jobs/:job_id    GET          Get a scheduled job
    /api/jobs/:job_id    PUT          Update a scheduled job


## Install within an Express app

1) add this repo to your package.json

```js
{
  "scheduler-app": "https://github.com/goodybag/scheduler-app.git"
}
```

2) register within express

```js
var schedulerApp = require('scheduler-app');

app.use(schedulerApp('postgres://localhost/cater'))

```
