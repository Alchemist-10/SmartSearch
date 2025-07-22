
import { Star, ShoppingCart, Heart } from "lucide-react";
import toast from 'react-hot-toast';
import { useState } from "react";

const ProductCard = ({ product, setProducts }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const handleAddToCart = () => {
        toast.success(`${product.name} has been added to your cart`)
    }

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        isWishlisted ? toast.success(`${product.name} Removed from wishlist`) : toast.success("Added to Wishlist")
    }

    function renderStars(rating) {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? "fill-yellow-400 border-none"
                    : "text-red-700"
                    }`}
            />
        ));
    }
    return (

        <div className="card bg-base-100 shadow-md hover:shadow-indigo-600 transition-all duration-300 hover:-translate-y-1">
            <figure className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 aspect-square"
                />
                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="btn btn-sm btn-ghost absolute top-2 right-2 backdrop-blur bg-base-100/80"
                >
                    <Heart
                        className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                    />
                </button>

                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="badge badge-warning absolute top-2 left-2">
                        -{product.discount}%
                    </div>

                )}
                {/* Stock Overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="badge badge-error">Out of Stock</div>
                    </div>
                )}
            </figure>
            <div className="card-body p-4 space-y-2">
                <div className="badge badge-secondary text-xs">{product.category}</div>

                <h2 className="card-title text-lg line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                </h2>

                <span className="text-xl font-bold text-primary">{product.brand}</span>


                <div className="flex items-center gap-2">

                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-500">{Number(product.rating) ? product.rating : "No rating"}</span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center gap-2">
                    {product.price && (
                        <>
                            <span className='inline-flex font-bold animate-text-gradient bg-gradient-to-r from-[#4635cc] via-[#8678f9] to-[#19a7ce] bg-[200%_auto] bg-clip-text text-xl text-transparent'>
                                ${(product.price - (product.discount * product.price / 100).toFixed(2))}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                                ${product.price}
                            </span>
                        </>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="btn btn-primary w-full font-bold text-xl flex items-center justify-center 
                bg-gradient-to-r from-[#4635cc] via-[#8678f9] to-[#19a7ce] 
                bg-[200%_auto] animate-gradient-x transition-all duration-300
                text-white border-none shadow-lg hover:scale-105 active:scale-95"
                    style={{
                        backgroundSize: '200% auto',
                        backgroundClip: 'border-box',
                    }}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>


            </div>

        </div>
    );


}



export default ProductCard;
