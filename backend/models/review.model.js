import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: "",
    },
}, { timestamps: true });

//  One user can only review a shop once
reviewSchema.index({ shopId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);