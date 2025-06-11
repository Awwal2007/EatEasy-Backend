const userModel = require("../Models/user")

const getAllUsers =async (req, res)=>{
    try {
        const users = await userModel.find() // return all users
        if(!users){
            return res.status(404).json({
                status: "error",
                message: "Users not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "users fetched!",
            users
        })
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "user fetched!",
            user
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// findByIdAndUpdate(id, body)
// findByIdAndDelete(id)

const getUserByQuery = async (req, res)=>{
    const {email} = req.query
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "user fetched!",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res)=>{
    const {id} = req.params
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body)
        if(!updatedUser){
            return res.status(400).json({
                status: "error",
                message: "user not updated"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "user fetched!",
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
    }
} 

const deleteUser = async (req, res)=>{
    const {id} = req.params
    try{
        // check if user exist
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }
        await userModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "success",
            message: "user has been deleted"
        })
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByQuery,
    deleteUser,
    updateUser
}