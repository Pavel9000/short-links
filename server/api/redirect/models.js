const db = require('../../db')
const db_redis = require('../../db/redis.js')

exports.get_long_link = async short_link => {
  try {

    let long_link = ''

    const long_link_redis = await db_redis.get().get( short_link )

    if (long_link_redis) {

      long_link = long_link_redis

    } else {

      const long_link_obj = await db.get().collection('links').findOne({ short_link: short_link })

      if (long_link_obj) {
        long_link = long_link_obj.long_link
        await db_redis.get().set( short_link, long_link, { EX: 30*24*60*60 })
      }

    }

    return long_link

  } catch (e) {
    console.log(e.message)
    return null
  }
}

exports.increase_statistics_user = async short_link => {
  try {

      const link_obj = await db.get().collection('links').findOne({ short_link: short_link })

      if (link_obj) {

        const statistics_user_obj = await db.get().collection('statistics_user').findOne({ id: link_obj.id })
        
        if ( statistics_user_obj ) {

          await db.get().collection('statistics_user').updateOne(
            { id: link_obj.id },
            { $set: {
                count: statistics_user_obj.count +1
              } 
            }
          )

        } else {
          return db.get().collection('statistics_user').insertOne( {
            id: link_obj.id,
            count: 1
          } )
        }

      }

    return link_obj

  } catch (e) {
    console.log(e.message)
    return null
  }
}
