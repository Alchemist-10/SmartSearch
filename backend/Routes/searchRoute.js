import express from "express";
import { fetchproducts,createproducts,updateProducts,deleteProducts} from "../controllers/searchController.js";


const router = express.Router();

router.get("/", fetchproducts);
router.post("/",createproducts)
router.put("/:id",updateProducts)
router.delete("/:id",deleteProducts)
export default router;