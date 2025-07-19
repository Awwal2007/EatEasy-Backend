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
            res.status(404).json({
                status: "error",
                message: "failed to load all orders"
            })
        }
        if(orders.length === 0){
            res.status(404).json({
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
        const myOrders = await orderModel.find({user: req.user});
        if(!myOrders){
            res.status(404).json({
                status: "error",
                message: "failed to load your orders"
            })
        }

        if(myOrders.length === 0){
            res.status(404).json({
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

const getSellerOrders = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    console.log(sellerId);
    
    if(!sellerId){
        return res.status(404).json({
            status: "error",
            message: "user id not found or login expired"
        })
    }

    const orders = await orderModel.find({
      'items.seller': sellerId, // match any item from this seller
    }).populate('user', 'name email') // populate customer info if needed
      .sort({ createdAt: -1 });

    if(!orders){
        return res.status(404).json({
            status: "error",
            message: "No order available"
        })
    }

    // Filter items to show only seller's items in each order
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(item => item.user.equals(sellerId));
      return {
        ...order.toObject(),
        items: sellerItems,
      };
    });

    res.status(200).json(filteredOrders);
  } catch (err) {
    console.error('Error fetching seller orders:', err);
    next(err)
  }
};



module.exports = {
    createOrder,
    getAllOrders,
    getMyOrders,
    getSellerOrders
}

