const Models = require('./models')
const shortid = require('shortid');

exports.create_link = async (req, res) => {

  try {
    
    if (!req.body.long_link) { return res.status(400).json({ message: "нет ссылки"}) }
    if (!req.body.id) { return res.status(400).json({ message: "нет id"}) }
    
    let short_link = '' 
    let is_exist_short_link = true

    if (req.body.subpart) {

      short_link = req.body.subpart
      is_exist_short_link = await Models.is_exist_short_link( short_link )

      if (is_exist_short_link) {
        return res.json({message: 'exist_short_link'})
      }

    } else {
      while (true) {
        short_link = shortid.generate()
        is_exist_short_link = await Models.is_exist_short_link( short_link )
        if (!is_exist_short_link) { break }
      }
    }

    const link = await Models.add_link( req.body.id, req.body.long_link, short_link )

    if (link) {

      return res.json({
        message: "success",
        short_link: short_link
      })
    } else {
      return res.status(400).json({ message: "Error"})
    }

  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message: e.message})
  }

}



exports.get_user_links = async (req, res) => {

  try {
    
    if (!req.params.id) { return res.status(400).json({ message: "нет id"}) }

    const user_links = await Models.get_user_links(req.params.id)
    
    return res.json({user_links: user_links})

  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message: "Error"})
  }

}
