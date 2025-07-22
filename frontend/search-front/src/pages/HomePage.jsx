import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios.js";
import Searchbar1 from "../components/SearchBar1.jsx";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard.jsx";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Electronics", "Clothing", "Accessories", "Home & Kitchen", "Sports", "Wearables"];


function Homepage() {
    const [searchTerm, setsearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [rating, setRating] = useState("");
    const [sortBy, setSortBy] = useState("rating");

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const params = new URLSearchParams({
                    ...(selectedCategory && selectedCategory !== "All" && { category: selectedCategory }),
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice }),
                    ...(rating && { rating }),
                    ...(searchTerm && { searchTerm }),
                });

                const res = await api.get(`/products?${params.toString()}`);
                let productlist = res.data;

                productlist.sort((a, b) => {
                    switch (sortBy) {
                        case "price-low":
                            return a.price - b.price;
                        case "price-high":
                            return b.price - a.price;
                        default:
                            return b.rating - a.rating;
                    }
                });

                setProducts(productlist);
            } catch (error) {
                toast.error("Failed to load products");
                console.error("Error fetching products from homepage.jsx", error);
            }
        };

        getProducts();
        setCurrentPage(1);
    }, [selectedCategory, minPrice, maxPrice, rating, searchTerm, sortBy]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const clearFilters = () => {
        setSelectedCategory("All");
        setMinPrice("");
        setMaxPrice("");
        setRating("");
        setSortBy("rating");
        setsearchTerm("");
    };

    return (
        <div className="cupcake p-2 min-h-screen">

            <div className="navbar">
                <Link to={"/"} ><h1 className='text-3xl justify-start font-bold animate-text-gradient bg-gradient-to-r from-[#2c16d3] via-[#8678f9] to-[#1ca6dc] bg-[200%_auto] bg-clip-text  text-transparent flex-shrink-0 mr-8'>
                    SmartSearch
                </h1> </Link><Searchbar1 onSearch={setsearchTerm} />

            </div>




            {/* Filters */}
            <div className="card bg-base-100 shadow mb-6">
                <div className="card-body">
                    <h2 className="card-title items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                        {/* Category Filter */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn m-1">Select Category</div>

                                {/* Select menu appears below the button */}
                                <div className="dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm mt-1">
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* Min Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Min Price</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="$0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>

                        {/* Max Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Max Price</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="$999"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>

                        {/* Sort By */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sort By</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Clear Button */}
                        <div className="form-control">
                            <label className="label invisible">
                                <span className="label-text">Clear</span>
                            </label>
                            <button className="btn btn-outline w-full" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Showing {currentProducts.length} of {products.length} products
                </p>
            </div>

            {/* Product Grid */}
            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} product={product} setProducts={setProducts} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                    <button className="btn btn-primary mt-4" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Homepage;
