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

exports.get_user_links = id => {
  try {
    return db.get().collection('links').find( { id: id } ).sort({_id:-1}).toArray()
  } catch (e) {
    console.log(e.message)
    return null
  }
}

