import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";
import { Search, Filter, RotateCcw } from "lucide-react";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	
	const { searchProducts, products, loading } = useProductStore();

	// Local states for filters
	const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
	const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
	const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

	// Trigger search on parameter changes
	useEffect(() => {
		const filters = {};
		if (selectedCategory) filters.category = selectedCategory;
		if (minPrice) filters.minPrice = minPrice;
		if (maxPrice) filters.maxPrice = maxPrice;

		searchProducts(query, filters);
	}, [searchProducts, query, selectedCategory, minPrice, maxPrice]);

	const handleCategoryChange = (category) => {
		const newCategory = selectedCategory === category ? "" : category;
		setSelectedCategory(newCategory);
		
		const newParams = new URLSearchParams(searchParams);
		if (newCategory) {
			newParams.set("category", newCategory);
		} else {
			newParams.delete("category");
		}
		setSearchParams(newParams);
	};

	const handlePriceApply = (e) => {
		e.preventDefault();
		const newParams = new URLSearchParams(searchParams);
		if (minPrice) newParams.set("minPrice", minPrice);
		else newParams.delete("minPrice");

		if (maxPrice) newParams.set("maxPrice", maxPrice);
		else newParams.delete("maxPrice");

		setSearchParams(newParams);
	};

	const handleResetFilters = () => {
		setSelectedCategory("");
		setMinPrice("");
		maxPrice && setMaxPrice("");
		
		const newParams = new URLSearchParams();
		if (query) newParams.set("q", query);
		setSearchParams(newParams);
	};

	return (
		<div className='min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Search Title */}
				<div className='flex items-center space-x-3 mb-8'>
					<Search className='text-emerald-400' size={32} />
					<h1 className='text-3xl font-bold'>
						{query ? `Search Results for "${query}"` : "Search Products"}
					</h1>
					<span className='bg-gray-800 border border-gray-700 text-gray-400 px-3 py-1 rounded-full text-sm font-semibold'>
						{products.length} Found
					</span>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Filters Panel (Left Side) */}
					<div className='lg:col-span-1 bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-2xl border border-gray-700 p-6 shadow-xl h-fit'>
						<div className='flex justify-between items-center mb-6 pb-4 border-b border-gray-700'>
							<h3 className='text-lg font-bold flex items-center gap-2'>
								<Filter size={18} className='text-emerald-400' /> Filters
							</h3>
							<button
								onClick={handleResetFilters}
								className='text-xs text-gray-400 hover:text-emerald-400 flex items-center gap-1 transition duration-200'
							>
								<RotateCcw size={12} /> Reset
							</button>
						</div>

						{/* Categories list */}
						<div className='mb-6'>
							<h4 className='text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3'>Category</h4>
							<div className='space-y-2'>
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => handleCategoryChange(cat)}
										className={`w-full text-left px-3 py-2 rounded-lg text-sm transition duration-200 flex items-center justify-between border ${
											selectedCategory === cat
												? "bg-emerald-600 bg-opacity-20 border-emerald-500 text-emerald-400"
												: "border-transparent text-gray-400 hover:bg-gray-700 hover:text-white"
										}`}
									>
										<span className='capitalize'>{cat.replace("-", " ")}</span>
										{selectedCategory === cat && (
											<span className='w-2 h-2 rounded-full bg-emerald-400' />
										)}
									</button>
								))}
							</div>
						</div>

						{/* Price Filter */}
						<form onSubmit={handlePriceApply} className='border-t border-gray-700 pt-6'>
							<h4 className='text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4'>Price Range</h4>
							<div className='flex gap-3 mb-4'>
								<div className='flex-1'>
									<label className='text-xs text-gray-400 block mb-1'>Min ($)</label>
									<input
										type='number'
										value={minPrice}
										onChange={(e) => setMinPrice(e.target.value)}
										placeholder='0'
										className='w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500'
									/>
								</div>
								<div className='flex-1'>
									<label className='text-xs text-gray-400 block mb-1'>Max ($)</label>
									<input
										type='number'
										value={maxPrice}
										onChange={(e) => setMaxPrice(e.target.value)}
										placeholder='9999'
										className='w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500'
									/>
								</div>
							</div>
							<button
								type='submit'
								className='w-full py-2 bg-emerald-600 hover:bg-emerald-500 transition duration-300 rounded-lg text-sm font-semibold'
							>
								Apply Price
							</button>
						</form>
					</div>

					{/* Results Panel (Right Side) */}
					<div className='lg:col-span-3'>
						{loading ? (
							<LoadingSpinner />
						) : products.length === 0 ? (
							<motion.div
								className='flex flex-col items-center justify-center bg-gray-800 bg-opacity-30 border border-gray-700 rounded-2xl p-16 text-center shadow-xl'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<Search className='text-gray-500 mb-6' size={60} />
								<h2 className='text-2xl font-bold text-gray-300 mb-2'>No Products Found</h2>
								<p className='text-gray-400 mb-4 max-w-md'>
									We couldn't find any products matching your query. Try resetting filters or using a different search term.
								</p>
								<button
									onClick={handleResetFilters}
									className='px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-semibold transition duration-300'
								>
									Clear Filters
								</button>
							</motion.div>
						) : (
							<motion.div
								className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								{products.map((product) => (
									<ProductCard key={product._id} product={product} />
								))}
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
