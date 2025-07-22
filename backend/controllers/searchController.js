import Data from "../model/Data.js";
import {distance} from "fastest-levenshtein"

const WEIGHTS = {
  name: 5,
   tag:4,
  category: 3,
  description: 1,
};

function computescore(keyvalue,searchterm,weight)
{
    const val=keyvalue ? keyvalue.toLowerCase() :""
    const search = searchterm.toLowerCase()

    if(val.includes(search)) return weight;
    
    const dist=distance(val,search)
    const fuzziness =1-dist/Math.max(val.length,search.length);

    return fuzziness>=0.6 ? weight*fuzziness : 0

}

const fetchproducts=async (req, res) => {
    try{
const { searchTerm, category, minPrice, maxPrice, rating } = req.query;
               let products=await Data.find();
        console.log(products.length)
        if (category && category !== "All") {
            products = products.filter(p => p.category === category);
        }
         if (minPrice) {
            products = products.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            products = products.filter(p => p.price <= parseFloat(maxPrice));
        }

        if (rating) {
            products = products.filter(p => p.rating >= parseFloat(rating));
        }

        if(!searchTerm) 
            return res.status(200).json(products);
        console.log(`SearchTerm: ${searchTerm}, Score:`, products.map(p => p.score));


        products=products.map(item =>{
            const score=computescore(item.name,searchTerm,WEIGHTS.name) +
            computescore(item.description,searchTerm,WEIGHTS.description) +
            computescore(item.category,searchTerm,WEIGHTS.category) +
            computescore(item.tags.join(" "),searchTerm,WEIGHTS.tag);

            const prodObj=item.toObject();
            return {...prodObj,score};
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Limit to top 10 results

        res.json(products);

    }
    catch(error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const createproducts = async (req, res) => {
  try {
    // 🧠 Check: is req.body an array? If not, wrap it in an array
    const data = Array.isArray(req.body) ? req.body : [req.body];
    

    // 🔄 Bulk insert using insertMany
    const createdProducts = await Data.insertMany(data);

    // 📤 Respond with the created products
    res.status(201).json(createdProducts);
  } catch (error) {
    // 🛑 Catch and log any error
    console.error("Error creating products:", error);
    return res.status(500).json({ message: "Internal Server Error from create products" });
  }
};

const updateProducts = async (req,res)=>{
   const { id } = req.params;            // 1️⃣ Extract product ID from URL (e.g., /products/:id)
   const updateData = req.body;          // 2️⃣ Get updated fields from the request body

   try{
    const updated = await Data.findByIdAndUpdate(id,updateData,{
      new:true, // 3️⃣ Return the updated document instead of the original
      runValidators: true,              // 4️⃣ Apply schema validation during update
    })
    if (!updated)
    {
      return res.status(404).json({message:"Product not found"})
    }
      res.json({ product: updated, message: "product updated successfully" });
 }
   catch(error)
   {
    console.error("Error updating product:", error); // 7️⃣ Log error
    res.status(500).json({ message: "Internal Server Error from updateProduts" });       // 8️⃣ Respond with error
  
   }

}

const deleteProducts=async (req,res) =>{
  
  try{
     const {id}=req.params
     const deleted= await Data.findByIdAndDelete(id)
     if(!deleted) return res.status(204).json({message:"invalid id"})
      res.status(200).json({message:"Note deleted successffully"})
  }
  catch(error)
  {
    console.log(`error in deletenote controller ${error}`)
    res.status(500).json({message:"Internal server error from deleteProduct controller"})
  }
}


export { fetchproducts, createproducts,updateProducts,deleteProducts };


  


