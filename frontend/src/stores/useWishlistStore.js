import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
	wishlist: [],
	loading: false,

	getWishlistItems: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("/wishlist");
			set({ wishlist: res.data, loading: false });
		} catch (error) {
			set({ wishlist: [], loading: false });
			console.error("Error fetching wishlist:", error);
		}
	},

	toggleWishlist: async (product) => {
		try {
			await axios.post("/wishlist/toggle", { productId: product._id });
			
			const { wishlist } = get();
			const isAlreadyFavorite = wishlist.some((item) => item._id === product._id);

			if (isAlreadyFavorite) {
				set({
					wishlist: wishlist.filter((item) => item._id !== product._id),
				});
				toast.success("Removed from wishlist");
			} else {
				set({
					wishlist: [...wishlist, product],
				});
				toast.success("Added to wishlist");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
}));
