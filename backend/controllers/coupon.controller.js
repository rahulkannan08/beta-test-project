import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
	try {
		let coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
		if (!coupon) {
			coupon = new Coupon({
				code: "WELCOME10",
				discountPercentage: 10,
				expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
				userId: req.user._id,
				isActive: true,
			});
			await coupon.save();
		}
		res.json(coupon || null);
	} catch (error) {
		console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;

		if (code && code.toUpperCase() === "WELCOME10") {
			const existingWelcome = await Coupon.findOne({ code: "WELCOME10", userId: req.user._id });
			if (!existingWelcome) {
				const welcomeCoupon = new Coupon({
					code: "WELCOME10",
					discountPercentage: 10,
					expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
					userId: req.user._id,
					isActive: true,
				});
				await welcomeCoupon.save();
			}
		}

		const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save();
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
