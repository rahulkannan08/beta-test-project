import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Trash2, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const WishlistPage = () => {
	const { wishlist, getWishlistItems, toggleWishlist, loading } = useWishlistStore();
	const { addToCart } = useCartStore();

	useEffect(() => {
		getWishlistItems();
	}, [getWishlistItems]);

	if (loading) return <LoadingSpinner />;

	return (
		<div className='min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex items-center space-x-3 mb-8'>
					<Heart className='text-red-500 fill-red-500' size={36} />
					<h1 className='text-3xl sm:text-4xl font-bold text-gray-100'>My Wishlist</h1>
				</div>

				{wishlist.length === 0 ? (
					<motion.div
						className='flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl border border-gray-700 p-12 text-center shadow-2xl'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Heart className='text-gray-500 mb-6' size={80} />
						<h2 className='text-2xl font-bold mb-3 text-gray-300'>Your wishlist is empty</h2>
						<p className='text-gray-400 mb-8 max-w-md'>
							Explore our collections and add items to your wishlist. They will be saved here so you can easily purchase them later!
						</p>
						<Link
							to='/'
							className='inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-lg font-medium text-white hover:bg-emerald-500 transition duration-300'
						>
							<ArrowLeft className='mr-2' /> Start Shopping
						</Link>
					</motion.div>
				) : (
					<motion.div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{wishlist.map((product) => (
							<motion.div
								key={product._id}
								className='flex w-full relative flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800 bg-opacity-40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition duration-300'
								layout
							>
								{/* Image */}
								<div className='relative mx-3 mt-3 flex h-52 overflow-hidden rounded-xl bg-gray-900 border border-gray-700'>
									<Link to={`/product/${product._id}`} className='w-full'>
										<img className='object-cover w-full h-full hover:scale-105 transition-transform duration-500' src={product.image} alt={product.name} />
									</Link>
									<button
										onClick={() => toggleWishlist(product)}
										className='absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-75 border border-gray-700 hover:bg-red-950 text-red-500 transition duration-300'
										title='Remove from wishlist'
									>
										<Trash2 size={18} />
									</button>
								</div>

								{/* Info */}
								<div className='mt-4 px-5 pb-5 flex-1 flex flex-col justify-between'>
									<div>
										<Link to={`/product/${product._id}`}>
											<h5 className='text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition duration-200 line-clamp-1'>
												{product.name}
											</h5>
										</Link>
										<span className='inline-block px-2 py-0.5 mt-1.5 rounded bg-emerald-500 bg-opacity-15 text-emerald-400 text-xs font-semibold uppercase'>
											{product.category}
										</span>
									</div>

									<div className='mt-4'>
										<div className='flex items-center justify-between mb-4'>
											<span className='text-2xl font-extrabold text-emerald-400'>${product.price.toFixed(2)}</span>
										</div>

										<button
											className='w-full flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-500 transition duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300'
											onClick={() => addToCart(product)}
										>
											<ShoppingCart size={18} className='mr-2' />
											Add to Cart
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default WishlistPage;
