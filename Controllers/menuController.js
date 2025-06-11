const menuItem = require("../Models/menuItem")

const getAllFoods = async (req, res, next)=>{

    try {
        const foods = await menuItem.find()
        // res.json(foods)
        if(!foods){
            return res.status(404).json({
                status: "error",
                message: "foods not found"
            })
        }

        if(foods.length === 0){
            return res.status(300).json({
                status: "null",
                message: "There is no food in the database"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "foods fetched!",
            foods
        })
    } catch (error) {
        console.log(error);
        next(error)       
    }
}

const postFood = async (req, res, next)=>{
    const {name, description, price, category, image} = req.body
    try {
        
        if (!req.file || !req.file.path) {
            return res.status(400).json({
                status: "error",
                message: "Image upload failed or missing",
            });
        }
        const food = await menuItem.create({...req.body, image: req.file.path, createdBy: req.user.id})

        if(!food){
            return res.status(404).json({
                status: "error",
                message: "Invalid item to upload"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "foods posted successfully!",
            food
        })

    } catch (error) {
        console.log(error);    
        next(error)    
    }
}

const getFoodById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const food = await menuItem.findById(id)
        if(!food){
            return res.status(404).json({
                status: "error",
                message: `food with this id: ${id} not found`
            })
        }

        res.status(200).json({
            status: 'success',
            message: "food fetched!",
            food
        })
    } catch (error) {
        console.log(error);
        next(error)     
    }
}

const getFoodByIdAndDelete = async (req, res, next)=>{
    const {id} = req.params
    try {
        const food = await menuItem.findByIdAndDelete(id, u_id)
        if(!food){
            return res.status(404).json({
                status: "error",
                message: `food with id: ${id} not found`
            })
        }
        res.status(202).json({
            status: "error",
            message: "Food deleted successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

module.exports = {
    getAllFoods,
    getFoodById,
    getFoodByIdAndDelete,
    postFood
}