const Models = require('./models')

exports.redirect = async (req, res) => {

  try {

    if (!req.params.short_link) { return res.json({ message: "Неверная ссылка"}) }

    const long_link = await Models.get_long_link(req.params.short_link)

    if (long_link) {
      let link = long_link
      if (link.indexOf('http') === -1) {
          link = 'https://'+link
      }

      const increase_statistics_user = await Models.increase_statistics_user(req.params.short_link)

      res.redirect( link )

    } else {
      return res.json({ message: "Неверная ссылка"})
    }

  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message: e.message})
  }

}
