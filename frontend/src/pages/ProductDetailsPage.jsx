import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const { fetchProductById, currentProduct, loading } = useProductStore();
	const { addToCart } = useCartStore();
	const { wishlist, toggleWishlist } = useWishlistStore();
	const { user } = useUserStore();

	useEffect(() => {
		fetchProductById(id);
	}, [fetchProductById, id]);

	if (loading) return <LoadingSpinner />;

	if (!currentProduct) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center text-white'>
				<h2 className='text-3xl font-semibold mb-4'>Product Not Found</h2>
				<Link to='/' className='flex items-center text-emerald-400 hover:underline'>
					<ArrowLeft className='mr-2' /> Back to Home
				</Link>
			</div>
		);
	}

	const isFavorite = wishlist.some((item) => item._id === currentProduct._id);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		addToCart(currentProduct);
	};

	const handleToggleWishlist = () => {
		if (!user) {
			toast.error("Please login to manage your wishlist", { id: "login" });
			return;
		}
		toggleWishlist(currentProduct);
	};

	return (
		<div className='min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<Link to='/' className='inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition duration-300'>
					<ArrowLeft className='mr-2' size={20} /> Back to Products
				</Link>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl border border-gray-700 p-6 sm:p-10 shadow-2xl'>
					{/* Left: Image Panel */}
					<motion.div
						className='relative aspect-square overflow-hidden rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center'
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<img
							src={currentProduct.image}
							alt={currentProduct.name}
							className='object-cover w-full h-full hover:scale-105 transition-transform duration-500'
						/>
						<button
							onClick={handleToggleWishlist}
							className='absolute top-4 right-4 p-3 rounded-full bg-gray-800 bg-opacity-70 border border-gray-600 hover:bg-gray-700 text-white hover:text-red-500 transition duration-300'
						>
							<Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-white"} size={24} />
						</button>
					</motion.div>

					{/* Right: Details Panel */}
					<motion.div
						className='flex flex-col justify-between'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div>
							<span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 bg-opacity-20 text-emerald-400 border border-emerald-500 mb-4 uppercase tracking-wider'>
								{currentProduct.category}
							</span>
							<h1 className='text-3xl sm:text-4xl font-bold mb-4 text-gray-100'>{currentProduct.name}</h1>
							<p className='text-3xl font-extrabold text-emerald-400 mb-6'>${currentProduct.price.toFixed(2)}</p>
							
							<div className='border-t border-gray-700 pt-6 mb-6'>
								<h3 className='text-lg font-semibold text-gray-300 mb-2'>Description</h3>
								<p className='text-gray-400 leading-relaxed'>{currentProduct.description}</p>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row gap-4 mt-8'>
							<button
								onClick={handleAddToCart}
								className='flex-1 flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 text-center text-lg font-medium text-white hover:bg-emerald-500 transition duration-300 shadow-lg shadow-emerald-900/40 focus:outline-none focus:ring-4 focus:ring-emerald-300'
							>
								<ShoppingCart size={24} className='mr-3' />
								Add to Cart
							</button>
							
							<button
								onClick={handleToggleWishlist}
								className={`flex items-center justify-center rounded-xl border px-6 py-4 text-lg font-medium transition duration-300 focus:outline-none ${
									isFavorite
										? "border-red-500 bg-red-500 bg-opacity-10 text-red-400 hover:bg-opacity-20"
										: "border-gray-600 text-gray-300 hover:bg-gray-700"
								}`}
							>
								<Heart className='mr-2' size={24} />
								{isFavorite ? "In Wishlist" : "Add to Wishlist"}
							</button>
						</div>
					</motion.div>
				</div>

				{/* Recommendations Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<PeopleAlsoBought />
				</motion.div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
