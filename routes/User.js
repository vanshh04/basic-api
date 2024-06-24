const express = require('express')
const { getallusers, getuser, createuser, updateuser, deleteuser } = require('../controllers/usercontroller')
const Router = express.Router()
const authenticateToken = require('../middlewares/auth');
const {login } = require('../controllers/authcontrol')

Router.route('login').post(login)
Router.route('/' , authenticateToken).get(getallusers).post(createuser)
Router.route('/:userId' , authenticateToken).get(getuser).put(updateuser).patch(updateuser).delete(deleteuser)
module.exports = Router