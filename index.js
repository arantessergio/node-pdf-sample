const express = require('express')
const morgan = require('morgan')
const routes = require('./src/routes/Pdf')

const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Authorization,  Accept'
    )

    next()
})

routes(app)

app.listen(process.env.PORT || 3000, () => console.log('app is running...'))
