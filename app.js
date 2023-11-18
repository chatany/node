const exp=require("express")
const userRouter = require("./controllers/user")
const app=exp()
require("./connection")


app.use(exp.json())
app.use("/user",userRouter)

app.listen("6000",(req,res)=>{
    console.log("server on hogya")
})