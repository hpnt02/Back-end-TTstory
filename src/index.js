const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParse = require('cookie-parser')
const morgan = require('morgan')
const db = require('./config/db')
const port = 3005
const app = express()

// const route = require('./routes')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const orderRoute = require('./routes/order')
  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
//Connect to db
db.connect();
app.use(morgan('combined'))
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   headers: "content-type",
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   enablePreflight: false,
//   preflightContinue: false,
// }



app.use(cors({
  origin: 'https://tt-shop.vercel.app',
   headers: "content-type",
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['token','Content-Type', 'Authorization', 'access-control-allow-credentials','access-control-allow-methods','access-control-allow-origin','access-control-allow-headers'],
   credentials: true,
   enablePreflight: false,
   preflightContinue: false,
}))

app.use(cookieParse())
app.use(express.json())

// route(app)
app.use("/v1/auth", authRoute)
app.use("/v1/admin", adminRoute)
app.use("/v1/order", orderRoute)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })


  //Authentication  










