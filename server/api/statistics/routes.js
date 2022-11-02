const {Router} = require('express')
const router = Router()
const controller = require('./controllers')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', controller.get_statistics)

module.exports = router