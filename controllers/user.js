const expres=require("express")
const userRouter=expres.Router()
const bcrypt=require("bcryptjs")
const userModul=require("../schema/userSchema.js")

userRouter.post("/data",(req,res)=>{
    const user=userModul({
        Name:req.body.Name,
        Surname:req.body.Surname,
        mobile:req.body.mobile,
        password:req.body.password,
        age:req.body.age
    })
    user.save().then((data,err)=>{
        if(err){
            res.json({status:0,message:"something went worng",err})
        }
        else{
            res.json({status:1,message:"sucessful",result:data})
        }

    })
})

module.exports=userRouter
userRouter.post("/update",(req,res)=>{
    userModul.updateMany({mobile:8385003007},{$set:{Surname:"sharma"}}).then((data,err)=>{
        if(err){
           console.log(err)
        }
        else{
            res.json({data})
        }

    })
})
userRouter.post("/find",(req,res)=>{
    userModul.find({age:{$gt:55}}).skip(req.body.page*2).limit(req.body.limit).sort({age:1}).then((data,err)=>{
        if(err){
            res.json({status:0,Error:err})
        }
        else{
            res.json({status:1,result:data})
        }

    })
})


userRouter.post("/bcrypt",(req,res)=>{
    const user=userModul({
        Name:req.body.Name,
        Surname:req.body.Surname,
        mobile:req.body.mobile,
        password:req.body.password,
        age:req.body.age
    })
    bcrypt.genSalt(10,function(err,Salt){
        bcrypt.hash(user.password, Salt, function (err, hash) {
            if(err){
                console.log(err)
            }
            else{
                user.password=hash
                user.save().then((data,err)=>{
                    if(err){
                        res.json({status:0,message:"something went worng",err})
                    }
                    else{
                        res.json({status:1,message:"sucessful",result:data})
                    }
            
                })
            }
        })
    })




   
})
userRouter.post("/Login",(req,res)=>{
    userModul.findOne({Name:req.body.Name}).then((data,err)=>{
        if(err){
            res.json({message:"error"})
        }else{
            if(!data){
                res.json({message:"data not found"})
            }
            else{
                console.log(data)
                bcrypt.compare(req.body.password, data.password,
                    async (err, isMatch) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            if (isMatch) {
                                res.json({ status: 1, message: "login successful", result:data})

                            }
                            else {
                                res.json({ status: 1, message: "user not found" })
                            }
                        }
                    })    
            }
        }
    })
})