const Router = require('express')
const router = new Router()
const { register, login, getUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.get('/', authMiddleware, getUser)

module.exports = router
