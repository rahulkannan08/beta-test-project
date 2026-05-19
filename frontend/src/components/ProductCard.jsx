import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { wishlist, toggleWishlist } = useWishlistStore();

	const isFavorite = wishlist.some((item) => item._id === product._id);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		addToCart(product);
	};

	const handleToggleWishlist = (e) => {
		e.preventDefault();
		if (!user) {
			toast.error("Please login to manage your wishlist", { id: "login" });
			return;
		}
		toggleWishlist(product);
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800 bg-opacity-20 shadow-lg hover:shadow-xl transition duration-300'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-900 border border-gray-700'>
				<Link to={`/product/${product._id}`} className='w-full'>
					<img className='object-cover w-full h-full hover:scale-105 transition-transform duration-500' src={product.image} alt='product image' />
				</Link>
				<div className='absolute inset-0 bg-black bg-opacity-20 pointer-events-none' />
				
				{/* Wishlist toggle button */}
				<button
					onClick={handleToggleWishlist}
					className='absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-70 border border-gray-700 text-white hover:text-red-500 hover:bg-opacity-90 transition duration-300'
				>
					<Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-white"} size={18} />
				</button>
			</div>

			<div className='mt-4 px-5 pb-5 flex-1 flex flex-col justify-between'>
				<div>
					<Link to={`/product/${product._id}`}>
						<h5 className='text-lg font-semibold tracking-tight text-white hover:text-emerald-450 transition duration-200 line-clamp-1'>{product.name}</h5>
					</Link>
					<span className='inline-block px-2 py-0.5 mt-1.5 rounded bg-emerald-500 bg-opacity-15 text-emerald-400 text-xs font-semibold uppercase'>
						{product.category}
					</span>
				</div>
				
				<div className='mt-4'>
					<div className='mt-2 mb-4 flex items-center justify-between'>
						<p>
							<span className='text-2xl font-bold text-emerald-400'>${product.price.toFixed(2)}</span>
						</p>
					</div>
					<button
						className='w-full flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
						text-white hover:bg-emerald-500 transition duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300'
						onClick={handleAddToCart}
					>
						<ShoppingCart size={18} className='mr-2' />
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
