const express = require("express")
const mongoose= require("mongoose")
const bodyParser= require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1:27017/E-COMMERCE",).then(()=>{
    console.log("connect to mongodb");
}).catch((err)=>{
    console.log(err);
})



const scma=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    rating:Number,
    outOfStock:Number
})

const PD= new mongoose.model("PRODUCT", scma)



app.post("/product/add",async(req,res)=>{

   const product= await PD.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})


app.get("/product/all/",async(req,res)=>{

    const product= await PD.find()
    res.status(500).json({
        success:true,
        product
    })
})


app.put("/product/update/:id", async(req,res)=>{

    let product = await PD.findById(req.params.id)
    product= await PD.findByIdAndUpdate(req.params.id, req.body,{new:true,
    useFindAndModify:false,
    runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
})



app.delete("/product/delete/:id",async(req,res)=>{

    const product = await PD.findById(req.params.id)
   
     if(!product){
       return res.status(505).json({
            success:false,
            message:"hoot amaloge bhap koro miah id bul dili keno taiko"
        })
     }
     else {  await product.remove()}
      
    
      app.delete("/product/all/delete",async(req,res)=>{

      const product = await PD.find()
      await product.remove()
      res.status(200).json({
        success:true,
        message:"all file deleted "
      })

      })


    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

})





app.get("/",(req,res)=>{
    res.send("your server is on ")
})
app.listen(4000,()=>{
    console.log("server is on now");
})