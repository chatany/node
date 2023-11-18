const mongose=require("mongoose")
mongose.connect("mongodb://127.0.0.1:27017/new").then((data,err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("connected to db")
    }

})