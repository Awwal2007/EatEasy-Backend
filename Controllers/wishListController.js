const wish = require('../Models/wishList');
// const Food = require('../Models/menuItem');

const getWishList = async (req, res, next) => {
 try {
    const {userId} = req.params;
    const wishList = await wish.find({user: userId}).populate('user', 'name email profilePicture');
    if(!wishList){
        res.status(404).json({
            status: "error",
            message: "wish list with the id given not found"
        })
    }

    return res.status(200).json({status: "success", message: "wishList Fetched", wishList})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

const addToWishList = async (req, res, next) => {
    
 try {
    console.log(req.user);
    

    const wishListItem = await wish.find({productId:req.body.productId})

    if(wishListItem.length === 0){
        let wishList = new wish({
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
        if(!wishListItem){
            return res.status(500).json({
                status: "error",
                message: "wishList Item with the id given not found"
            })
        }

        wishList = await wishList.save();

        return res.status(200).json({status: "success", message: "wishList added successfully", wishList})
        
    }else{
        return res.status(400).json({
            status: "error",
            message: "Item already exists in the wishList"
        });
    }
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

const removeWishListItem = async (req, res, next) => {

 try {
    
    const wishList = wish.findById(req.params.id)

    if(!wishList){
        res.status(500).json({
            status: "error",
            message: "wishList Item with the id given not found"
        })
    }

    const deletedWishList = await wish.findByIdAndDelete(req.params.id);

    if(!deletedWishList){
        res.status(500).json({
            status: "error",
            message: "wishList Item not found"
        })
    }

    return res.status(200).json({status: "success", message: "item removed from wish list", deletedWishList})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

const updateWishListItem = async (req, res, next) => {
    
 try {
    const wishList = await wish.findByIdAndUpdate(req.params.id,
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
    if(!wishList){
        res.status(500).json({
            status: "error",
            message: "WishList Item cannot be updated!"
        })
    }

    return res.status(200).json({status: "success", message: "item added to wishList", wishList})
 } catch (error) {
    console.log(error);
    next(error)
 }  
};

module.exports = { addToWishList, getWishList, removeWishListItem, updateWishListItem };