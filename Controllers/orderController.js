const orderModel = require('../Models/order')

const createOrder = async (req, res, next)=>{
    const {} = req.body
    try {
        const order = await orderModel.create({...req.body, user: req.user})
        if(!order){
            (res.status(404).json({
                status: "error",
                message: "Failed to create order"
            }))
        }

        res.status(202).json({
            status: "success",
            message: "Order Created Successfully",
            order
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getAllOrders = async (req, res, next)=>{
    try {
        const orders = await orderModel.find()
        if(!orders){
            return res.status(404).json({
                status: "error",
                message: "failed to load all orders"
            })
        }
        if(orders.length === 0){
            return res.status(404).json({
                status: "error",
                message: "no orders in the database"
            })
        }
        res.status(202).json(
            {
                status: "success",
                message: "Order Fetched Successfully",
                orders
            }
        )
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getMyOrders = async(req, res, next)=>{
    try {
        const myOrders = await orderModel.find({user: req.user}).populate("items.menuItem");
        // res.json(myOrders)
        if(!myOrders){
            return res.status(404).json({
                status: "error",
                message: "failed to load your orders"
            })
        }

        if(myOrders.length === 0){
            return res.status(404).json({
                status: "error",
                message: "no orders in the database"
            })
        }
        res.status(202).json(
            {
                status: "success",
                message: "Your Order has been Fetched Successfully",
                myOrders
            }
        )
    } catch (error) {
        console.log(error);
        next(error)
    }
}


module.exports = {
    createOrder,
    getAllOrders,
    getMyOrders
}

