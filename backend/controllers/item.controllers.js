import uploadOnCloudinary from "../utils/cloudinary.js";
import { Shop } from "../models/shop.model.js";
import { Item } from "../models/item.model.js";

export const createItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    
    // ✅ Find shop of logged-in user
    const shop = await Shop.findOne({ owner: req.user?.userId });
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Shop not found for this owner",
      });
    }

    // ✅ Validate required fields
    if (!name || !category || !price || !foodType) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // ✅ Upload image if exists
    let image;
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      if (!uploadedImage) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
      image = uploadedImage;
    }

    // ✅ Create item
    const item = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });

    await item.populate("shop");

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      item,
    });

  } catch (error) {
    console.log("Error during item create:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, price, foodType } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    // Find shop of logged-in user
    const shop = await Shop.findOne({ owner: req.user?.userId });
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Shop not found for this owner",
      });
    }

    // Find item belonging to this shop
    let item = await Item.findOne({ _id: itemId, shop: shop._id });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found or not allowed",
      });
    }

    // Upload new image if exists
    let image;
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      if (!uploadedImage) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
      image = uploadedImage;
    }

    // Update only sent fields
    if (name) item.name = name;
    if (category) item.category = category;
    if (price) item.price = price;
    if (foodType) item.foodType = foodType;
    if (image) item.image = image;

    await item.save();
    await item.populate("shop");

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });

  } catch (error) {
    console.log("Error during item edit:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    // Find shop of logged-in user
    const shop = await Shop.findOne({ owner: req.user?.userId });
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Shop not found for this owner",
      });
    }

    // Find item belonging to this shop
    const item = await Item.findOne({ _id: itemId, shop: shop._id });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found or not allowed",
      });
    }

    // Delete item
    await Item.deleteOne({ _id: itemId });


    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });

  } catch (error) {
    console.log("Error during item delete:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
