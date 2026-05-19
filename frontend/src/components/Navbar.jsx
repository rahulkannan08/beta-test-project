import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Heart, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const { wishlist } = useWishlistStore();
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
		}
	};

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-850'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center gap-4'>
					{/* Brand Name */}
					<Link to='/' className='text-2xl font-extrabold text-emerald-400 items-center space-x-2 flex tracking-tight hover:scale-102 transition duration-200'>
						<span>E-Commerce</span>
					</Link>

					{/* Search Bar Form */}
					<form onSubmit={handleSearchSubmit} className='flex-1 max-w-md relative mx-2'>
						<input
							type='text'
							placeholder='Search products...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-gray-800 bg-opacity-80 text-white pl-10 pr-4 py-2 rounded-xl text-sm border border-gray-700 focus:outline-none focus:border-emerald-500 transition duration-300'
						/>
						<button type='submit' className='absolute left-3 top-2.5 text-gray-400 hover:text-emerald-400 transition duration-250'>
							<Search size={16} />
						</button>
					</form>

					{/* Navigation Links */}
					<nav className='flex flex-wrap items-center gap-4 sm:gap-6'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out font-medium'
						>
							Home
						</Link>

						{user && (
							<>
								{/* Wishlist Link */}
								<Link
									to={"/wishlist"}
									className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
								>
									<Heart className='inline-block mr-1 group-hover:text-red-500 group-hover:scale-110 transition duration-300' size={20} />
									<span className='hidden md:inline'>Wishlist</span>
									{wishlist.length > 0 && (
										<span
											className='absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5 
										text-xs group-hover:bg-red-400 transition duration-300 ease-in-out'
										>
											{wishlist.length}
										</span>
									)}
								</Link>

								{/* Cart Link */}
								<Link
									to={"/cart"}
									className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
								>
									<ShoppingCart className='inline-block mr-1 group-hover:text-emerald-450' size={20} />
									<span className='hidden md:inline'>Cart</span>
									{cart.length > 0 && (
										<span
											className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
										text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
										>
											{cart.length}
										</span>
									)}
								</Link>
							</>
						)}

						{isAdmin && (
							<Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-semibold
								 transition duration-300 ease-in-out flex items-center shadow-lg shadow-emerald-950/40 border border-emerald-600'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={16} />
								<span>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 border border-gray-750
						rounded-xl flex items-center transition duration-300 ease-in-out font-medium'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-xl flex items-center transition duration-300 ease-in-out font-semibold'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 border border-gray-750
									rounded-xl flex items-center transition duration-300 ease-in-out font-medium'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
