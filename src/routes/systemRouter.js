const Router = require('express')
const router = new Router()
const { createSystem, getSystems } = require('../controllers/systemController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, createSystem)
router.get('/', authMiddleware, getSystems)

module.exports = router
