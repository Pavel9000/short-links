const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = function (url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, 
    async function (err, db) {
      if (err) {
        return done(err);
      }
      state.db = db.db('DB');

      await state.db.collection('links').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 30*24*60*60 } )
      await state.db.collection('links').createIndex( { "id": 1 } )
      await state.db.collection('links').createIndex( { "short_link": 1 } )

      done()
    }
  )
}

exports.get = function () {
  return state.db;
}