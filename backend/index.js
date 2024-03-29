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

const connectionString = 'mongodb+srv://ratsdust4226:BYZaTL6qag4ZykZq@cluster0.0divulq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server is running at the port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// mongoose.connect("mongodb+srv://ratsdust4226:BYZaTL6qag4ZykZq@cluster0.0divulq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(console.log("MongoDb connected"))
// .catch((err)=>console.log(err))
// app.listen(5000, ()=>{
//   console.log("server is running at the port 5000");
// })