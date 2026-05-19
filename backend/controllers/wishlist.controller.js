import Product from "../models/product.model.js";

export const getWishlistProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: req.user.wishlist } });
		res.json(products);
	} catch (error) {
		console.log("Error in getWishlistProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleWishlist = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;

		const isFavorite = user.wishlist.includes(productId);

		if (isFavorite) {
			user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
		} else {
			user.wishlist.push(productId);
		}

		await user.save();
		res.json(user.wishlist);
	} catch (error) {
		console.log("Error in toggleWishlist controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
