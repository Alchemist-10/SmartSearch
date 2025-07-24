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

