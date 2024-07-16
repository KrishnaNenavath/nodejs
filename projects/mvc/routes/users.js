const express = require('express')

const {handdleCreateNewUser, 
     handdleGetUser, 
    handdleUpdateUser, 
    handdleDeleteUser,
    handdleGetUserById} = require('./../controllers/users')

const router = express.Router()

router.route("/")
.post(handdleCreateNewUser)
.get(handdleGetUser)

router.route("/:id")
.get(handdleGetUserById)
.patch(handdleUpdateUser)
.delete(handdleDeleteUser)

module.exports = router