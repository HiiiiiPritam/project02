import express from 'express'
import router from "./routes/user-routes.js";
import cors from 'cors'
import categoryRoutes from './routes/category-routes.js'
import blogrouter from "./routes/blog-routes.js";
import mongoose from 'mongoose';



let app= express();

app.use(cors());
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public/uploads'))

app.use("/api/user",router)
app.use("/api/blog",blogrouter);
app.use("/api/category",categoryRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/hacker3").then(console.log("MongoDb connected"))
.catch((err)=>console.log(err))
app.listen(5000, ()=>{
  console.log("server is running at the port 5000");
})