const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectToDb = require("./Config/connectToDb");
const sendVerificationEmail = require("./Services/Nodemailer/sendVerificationEmail");
const authRouter = require('./Routes/authRouter');
const userRouter = require('./Routes/userRouter');
const menuRouter = require('./Routes/menuRouter');
const orderRouter = require('./Routes/orderRouter');
const errorHandler = require("./Middlewares/errorHandler");
const paymentRouter = require('./Routes/paymentRouter');
const sellerRouter = require('./Routes/sellerRouter');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.listen(333, ()=>{
    console.log('listen to port 333');    
})
connectToDb();
//Routes
app.get("/", (req, res)=>{res.send("Welcome to EatEasy Api version 1.0")})

app.use(errorHandler);
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/food", menuRouter)
app.use("/api/order", orderRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/seller", sellerRouter)
app.use(express.json())

app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})
