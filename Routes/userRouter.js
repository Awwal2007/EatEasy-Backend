const express = require("express")
const userRouter = express.Router()

const {getAllUsers, getUserById, getUserByQuery} = require("../Controllers/userController")

userRouter.get("/", getAllUsers)
userRouter.get("/query", getUserByQuery)
userRouter.get("/:id", getUserById)

module.exports = userRouter