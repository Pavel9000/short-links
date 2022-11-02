const express = require('express')
const db = require('./db')
const db_redis = require('./db/redis.js')


const app = express()

// отключить защиту CORS
app.use(function (req, res, next) {
  var origins = [ 'http://localhost:3000' ];

  res.header('Access-Control-Allow-Origin', origins[0])
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  next();
});



app.use('/api/links', require('./api/links/routes'))

app.use('/api/statistics', require('./api/statistics/routes'))

app.use('/', require('./api/redirect/routes'))



async function start() {
    try {

      await db_redis.connect()

      db.connect('mongodb://localhost:27017', (err) =>  {
        if (err) {
          return console.log(err);
        }
        const PORT = 5000
        app.listen(PORT, function () {
          console.log(`API app started ${PORT}`);
        })
      })

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()