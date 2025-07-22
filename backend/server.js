import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import searchRoute from "./Routes/searchRoute.js";
import cors from "cors"
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/products",searchRoute);
//app.get('/api/products', (req, res) => res.send('Hello from ES Modules!'));
const PORT=process.env.PORT||5001;

connectDB().then(()=>{
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))

})
//store the data json in the backend from post man app.post
// when i search ask to get the item get it from the database
// we could add the add to cart button also
//when i click on a project it should display the product and same brand items
