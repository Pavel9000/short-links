const db = require('../../db')

exports.is_exist_short_link = short_link => {
  try {
    return db.get().collection('links').findOne({ short_link: short_link })
  } catch (e) {
    console.log(e.message)
    return null
  }
}

exports.add_link = async ( id, long_link, short_link ) => {
  try {

    return db.get().collection('links').insertOne( {
      createdAt: new Date(),
      id: id,
      long_link: long_link,
      short_link: short_link
    } )

  } catch (e) {
    console.log(e.message)
    return null
  }
}

exports.add_statistics_user = async ( id ) => {
  try {

    return db.get().collection('statistics_user').insertOne( {
      id: id,
      count: 0
    } )

  } catch (e) {
    console.log(e.message)
    return null
  }
}

exports.get_statistics = () => {
  try {
    return db.get().collection('statistics_user').find( { } ).sort({_id:-1}).toArray()
  } catch (e) {
    console.log(e.message)
    return null
  }
}

