const {Router} = require('express')
const router = Router()
const controller = require('./controllers')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/create', controller.create_link)
router.get('/:id', controller.get_user_links)

module.exports = router