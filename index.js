require('dotenv').config()
const initializeDb = require('./mongodb')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./src/routes/index')
const errorHandler = require('./src/middleware/errorHandlingMiddlware')

const PORT = process.env.PORT || 7000
const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))

initializeDb(() => {
  app.use('/api/', router)

  app.get('*', function (req, res, next) {
    let err = new Error('Page Not Found')
    err.statusCode = 404
    next(err)
  })

  app.use(errorHandler)

  app.listen(PORT, () => console.log(`server was successfully ran on ${PORT} PORT`))
})
