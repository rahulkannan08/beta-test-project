import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

dotenv.config();

const dummyProducts = [
	{
		name: "Classic Blue Denim Jeans",
		description: "High-quality slim-fit blue denim jeans made from durable organic cotton with a comfortable stretch.",
		price: 49.99,
		image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
		category: "jeans",
		isFeatured: true,
	},
	{
		name: "Distressed Denim Jeans",
		description: "Modern distressed street-wear denim jeans featuring fashionable rips and a relaxed tapered fit.",
		price: 59.99,
		image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
		category: "jeans",
		isFeatured: false,
	},
	{
		name: "Premium White Crewneck T-Shirt",
		description: "Ultra-soft premium combed cotton crewneck t-shirt. Breathable, durable, and perfect for everyday layering.",
		price: 19.99,
		image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
		category: "t-shirts",
		isFeatured: true,
	},
	{
		name: "Vintage Graphic T-Shirt",
		description: "Retro-style printed graphic t-shirt featuring classic vintage aesthetics and a relaxed boxy cut.",
		price: 24.99,
		image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
		category: "t-shirts",
		isFeatured: false,
	},
	{
		name: "Urban Retro Sneakers",
		description: "Comfortable urban retro style sneakers featuring cushioned insoles, genuine leather overlays, and durable grip soles.",
		price: 89.99,
		image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
		category: "shoes",
		isFeatured: true,
	},
	{
		name: "Classic Leather Loafers",
		description: "Handcrafted premium dark brown leather loafers with soft cushioned lining, perfect for smart-casual wear.",
		price: 119.99,
		image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop",
		category: "shoes",
		isFeatured: false,
	},
	{
		name: "Gold Aviator Sunglasses",
		description: "Iconic aviator sunglasses featuring a lightweight gold-finished frame and polarized UV400 protective lenses.",
		price: 34.99,
		image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
		category: "glasses",
		isFeatured: true,
	},
	{
		name: "Classic Matte Black Sunglasses",
		description: "Elegant and lightweight matte black sunglasses with dark polarized lenses and high-durability hinge pivots.",
		price: 29.99,
		image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
		category: "glasses",
		isFeatured: false,
	},
	{
		name: "Genuine Leather Biker Jacket",
		description: "Rugged and timeless genuine black leather biker jacket with asymmetrical heavy-duty zip lining and quilted shoulders.",
		price: 189.99,
		image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
		category: "jackets",
		isFeatured: true,
	},
	{
		name: "Casual Bomber Jacket",
		description: "Lightweight weather-resistant casual green bomber jacket featuring rib-knit collar and convenient sleeve utility pocket.",
		price: 69.99,
		image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
		category: "jackets",
		isFeatured: false,
	},
	{
		name: "Modern Tailored Navy Suit",
		description: "Sharp slim-fit two-piece navy blue suit. Crafted from premium breathable wool-blend fabric with fine stitch details.",
		price: 299.99,
		image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop",
		category: "suits",
		isFeatured: true,
	},
	{
		name: "Premium Charcoal Dinner Blazer",
		description: "Elegant charcoal grey single-breasted suit blazer. Features notch lapels and structured shoulder cushioning.",
		price: 149.99,
		image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
		category: "suits",
		isFeatured: false,
	},
	{
		name: "Premium Saffiano Leather Handbag",
		description: "Stunning structured handbag made from textured Saffiano leather featuring top-handles and a detachable shoulder strap.",
		price: 139.99,
		image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
		category: "bags",
		isFeatured: true,
	},
	{
		name: "Urban Canvas Backpack",
		description: "Durable and waterproof olive green canvas backpack with leather straps and dedicated protective laptop pocket.",
		price: 49.99,
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
		category: "bags",
		isFeatured: false,
	},
];

const seedDB = async () => {
	try {
		console.log("Connecting to MongoDB for seeding...");
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB!");

		console.log("Clearing existing products...");
		await Product.deleteMany({});
		console.log("Cleared products collection!");

		console.log("Seeding dummy products...");
		const seeded = await Product.insertMany(dummyProducts);
		console.log(`Successfully seeded ${seeded.length} products!`);

		mongoose.connection.close();
		console.log("Database connection closed.");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
};

seedDB();
