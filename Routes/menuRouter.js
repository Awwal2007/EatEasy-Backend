const express = require("express")
const menuRouter = express.Router()

const {getAllFoods, getFoodById, getFoodByIdAndDelete, postFood, getAllFoodsByAdmin} = require("../Controllers/menuController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const uploadProductImage = require("../Config/multer")
const isSeller = require("../Middlewares/isSeller")


menuRouter.get("/", getAllFoods)
menuRouter.get("/admin", isLoggedIn, isSeller, getAllFoodsByAdmin)
menuRouter.get("/:id", getFoodById)
menuRouter.delete("/:id", isLoggedIn, isSeller, getFoodByIdAndDelete )
menuRouter.post("/",  uploadProductImage.single("productImage"), isLoggedIn, isSeller, postFood)

module.exports = menuRouter