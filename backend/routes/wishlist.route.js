import express from "express";
import { getWishlistProducts, toggleWishlist } from "../controllers/wishlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getWishlistProducts);
router.post("/toggle", protectRoute, toggleWishlist);

export default router;
