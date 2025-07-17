const Cart = require('../Models/cart');
// const Food = require('../Models/menuItem');

const getCart = async (req, res, next) => {
 try {
    const {userId} = req.params;
    const cartList = await Cart.find({user: userId});
    if(!cartList){
        res.status(404).json({
            status: "error",
            message: "cart Item with the id given not found"
        })
    }

    return res.status(200).json({status: "success", message: "cartList Fetched", cartList})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

const addToCart = async (req, res, next) => {
    
 try {
    
    const cartItem = await Cart.find({productId: req.body.productId, user: req.params.userId})

    if(cartItem.length === 0){
        let cartList = new Cart({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            rating: req.body.rating,
            user: req.body.createdBy,        
            productId: req.body.productId,
            quantity: req.body.quantity || 1,
            subTotal: req.body.subTotal || 0,
        })
        if(!cartList){
            return res.status(500).json({
                status: "error",
                message: "cart Item with the id given not found"
            })
        }

        cartList = await cartList.save();

        return res.status(200).json({status: "success", message: "cart added successfully", cartList})
        
    }else{
        return res.status(400).json({
            status: "error",
            message: "Item already exists in the cart"
        });
    }
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

const removeCartItem = async (req, res, next) => {

 try {
    
    const cartItem = Cart.findById(req.params.id)

    if(!cartItem){
        res.status(500).json({
            status: "error",
            message: "cart Item with the id given not found"
        })
    }

    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);

    if(!deletedCartItem){
        res.status(500).json({
            status: "error",
            message: "cart Item not found"
        })
    }

    return res.status(200).json({status: "success", message: "cart item deleted", deletedCartItem})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};
const removeCartItemsAfterOrdered = async (req, res, next) => {
  try {
    const deletedCartItems = await Cart.deleteMany({ user: req.user.id });
    console.log(req.user.id)

    if (deletedCartItems.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "No cart items found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      message: "All cart items deleted after order",
      deletedCount: deletedCartItems.deletedCount,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const updateCartItem = async (req, res, next) => {
    
 try {
    const cartList = await Cart.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            rating: req.body.rating,
            user: req.body.createdBy,
            productId: req.body.productId,
            quantity: req.body.quantity || 1,
            subTotal: req.body.subTotal || 0,
        },
        {new: true}
    )
    if(!cartList){
        res.status(500).json({
            status: "error",
            message: "cart Item cannot be updated!"
        })
    }

    return res.status(200).json({status: "success", message: "cart added successfully", cartList})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

module.exports = { addToCart, getCart, removeCartItem, updateCartItem, removeCartItemsAfterOrdered };