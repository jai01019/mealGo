import { Review } from "../models/review.model.js";
import { Shop } from "../models/shop.model.js";

// POST /api/reviews/submit
export const submitReview = async (req, res) => {
    try {
        const { shopId, score, comment } = req.body;
             const userId = req.user?.userId;// from your auth middleware

        // Check if user already reviewed this shop
        const existing = await Review.findOne({ shopId, userId });
        if (existing) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already reviewed this shop" 
            });
        }

        // Save the review
        await Review.create({ shopId, userId, score, comment });

        // Recalculate shop's average rating
        const allReviews = await Review.find({ shopId });
        const avg = allReviews.reduce((sum, r) => sum + r.score, 0) / allReviews.length;

        await Shop.findByIdAndUpdate(shopId, {
            averageRating: parseFloat(avg.toFixed(1)),
            totalRatings: allReviews.length,
        });

        return res.status(201).json({ 
            success: true, 
            message: "Review submitted successfully" 
        });

    } catch (error) {
        console.error("Submit review error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/reviews/:shopId  →  get all reviews for a shop
export const getShopReviews = async (req, res) => {
    try {
        const { shopId } = req.params;

        const reviews = await Review.find({ shopId })
            .populate("userId", "fullName")  // only return fullName from user
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, reviews });

    } catch (error) {
        console.error("Get reviews error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};