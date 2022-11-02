const Models = require('./models')

exports.get_statistics = async (req, res) => {

  try {

    const statistics_users = await Models.get_statistics()

    if (statistics_users) {
      return res.json({statistics_users: statistics_users})
    } else {
      return res.json({statistics_users: []})
    }
    
    
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message: e.message})
  }

}
