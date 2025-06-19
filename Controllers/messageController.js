// const { Admin } = require("mongodb")
const messageModel = require("../Models/message")

const createMessage = async (req, res, next)=> {
    const {} = req.body
    try {
        const message = await messageModel.create({...req.body, sender: req.user})
        if(!message){
            return res.status(404).json({
                status: "error",
                message: "Failed to create message"
            })
        }

        res.status(201).json({
            status: "success",
            message: "Order Created Successfully",
            message
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getAllMessages = async (req, res, next)=>{
    try {
        const messages = await messageModel.find()
        if(!messages){
            return res.status(404).json({
                status: "error",
                message: "There is no message"
            })
        }
        res.status(202).json({
            status: "success",
            message: "messages fetched successfully",
            messages
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getAUsersMessages = async (req, res, next)=>{
    try {
        const messages = await messageModel.find({user: req.body});
        if(!messages){
            return res.status(404).json({
                status: "error",
                message: "failed to load your messages"
            })
        }
        if(messages.length === 0){
            return res.status(401).json({
                status: "null",
                message: "no message yet, send a new message"
            })
        }
        res.status(201).json({
            status: "success",
            message: "your message has been loaded successfully",
            messages
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = {
    createMessage,
    getAllMessages,
    getAUsersMessages
}