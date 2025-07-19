const foodSchema = require("../Models/menuItem")

const getAllFoods = async (req, res, next)=>{
    const { category } = req.query;
    console.log(category);
    
    try {
         // Build query object
        const filter = {};
        if (category) {
            filter.category = category;
        }

        const foods = await foodSchema.find(filter).sort({ createdAt: -1 }).populate('user', 'restaurantName');
        
        // res.json(foods)
        if(!foods){
            return res.status(404).json({
                status: "error",
                message: "foods not found"
            })
        }

        if(foods.length === 0){
            return res.status(200).json({
                status: "success",
                message: "There is no food in the database",
                foods: []
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
    // const {name, description, price, category, image} = req.body
    try {
        
        if (!req.file || !req.file.path) {
            return res.status(400).json({
                status: "error",
                message: "Image upload failed or missing",
            });
        }
        const food = await (await foodSchema.create({...req.body, image: req.file.path, user: req.user.id}))

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
        const food = await foodSchema.findById(id).populate('user', 'restaurantName')
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
        const food = await foodSchema.findByIdAndDelete(id, u_id)
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

const getAllFoodsByAdmin = async (req, res, next)=>{
    
    try {
        const sellerId = req.user.id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const search = req.query.search || '';
        const category = req.query.category || '';

        // Build the base filter
        const filter = {
            user: sellerId,
        };

        // Add search condition (by title or description)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Add category filter
        if (category) {
            filter.category = category;
        }

        const total = await foodSchema.countDocuments(filter);

        const foods = await foodSchema.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
        
        // res.json(foods)
        if(!foods){
            return res.status(404).json({
                status: "error",
                message: "foods not found"
            })
        }

        if(foods.length === 0){
            return res.status(200).json({
                status: "success",
                message: "There is no food with this user in the database",
                foods: []
            })
        }

        res.status(200).json({
            status: 'success',
            message: "foods fetched!",
            foods,
            total,
            page,
            limit
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
    postFood,
    getAllFoodsByAdmin
}