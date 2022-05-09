const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const systemRouter = require('./systemRouter')

router.use('/user', userRouter)
router.use('/systems', systemRouter)

module.exports = router
