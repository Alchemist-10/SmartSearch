import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
    type: Number,
   
    min: 0,
    max: 5,
  }, 
    description:
     {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true, // helps with filtering
  },
  brand: {
    type: String,
    default: "Generic",
  },
  inStock:{
    type:Number,
    default:0,
  },
  discount:{
    type:Number,
    default :0
  },
  image: {
    type: String, // since it's a URL
    required: true,
  },
  reviews:{
    type:Number,
  },
  tags: {
    type: [String],
    default: [],
    index: true, // good for keyword-based search
  }

})
export default mongoose.model("Data", dataSchema);
