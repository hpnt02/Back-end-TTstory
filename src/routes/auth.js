const authControllers = require('../controllers/authControllers')
const router = require('express').Router()
const middleWareController = require('../controllers/middleWareController')


router.post("/register", authControllers.createAccount)
router.post("/login", authControllers.login)
router.post("/refresh", authControllers.requestRefreshToken)
router.post("/logout", middleWareController.verifyToken ,authControllers.logOut)


module.exports = router