import uploadOnCloudinary from "../utils/cloudinary.js";
import { Shop } from "../models/shop.model.js";
import { Item } from "../models/item.model.js";
export const createEditShop = async (req, res) => {
  
  try {
    // Basic shop fields
    const { name, state, address, city, role } = req.body;

    // 🔹 Items come as JSON string from frontend (CreateEditShop page)
    //    Example: '[{ "name": "...", "image": "...", "category": "...", "price": 123, "foodType": "veg" }, ... ]'
    let parsedItems = [];
    if (req.body.items) {
      try {
        parsedItems = JSON.parse(req.body.items);
        if (!Array.isArray(parsedItems)) {
          parsedItems = [];
        }
      } catch (e) {
        console.log("Failed to parse items JSON in createEditShop:", e.message);
        parsedItems = [];
      }
    }
    if (!name || !state || !address || !city) {
  return res.status(400).json({
    success: false,
    message: "All required fields must be provided",
  });
}



    let image; 
    if (req.file) {
      const  uploadedImage = await uploadOnCloudinary(req.file.path);
      if (!uploadedImage) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
      image = uploadedImage;
    }

    const owner = req.user?.userId;

    if (!owner) {
      return res.status(400).json({
  success: false,
  message: "owner did not found",
});
    }



    let shop = await Shop.findOne({ owner });

    if (shop) {
      // 🔹 UPDATE EXISTING SHOP
      shop.name = name;
      shop.state = state;
      shop.address = address;
      shop.city = city;
      if (image) shop.image = image;
      await shop.save();
      await shop.populate("owner");

      // 🔹 Ensure items from Create/Edit Shop page are persisted as Item docs
      if (parsedItems.length > 0) {
        for (const itemData of parsedItems) {
          const { name, category, price, foodType, image: itemImage } = itemData || {};
          if (!name || !category || !price || !foodType) continue;

          // Avoid duplicate items (same shop + same basic fields)
          const alreadyExists = await Item.findOne({
            shop: shop._id,
            name,
            category,
            price,
            foodType,
          });
          if (alreadyExists) continue;

          await Item.create({
            name,
            category,
            price,
            foodType,
            image: itemImage || "",
            shop: shop._id,
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Shop updated successfully",
        shop,
      });
    }

    // 🔹 CREATE NEW SHOP
    shop = await Shop.create({ 
      name,
      state,
      address,
      city,
      image,
      owner
    });

    // 🔹 If items were provided when creating a shop, persist them too
    if (parsedItems.length > 0) {
      for (const itemData of parsedItems) {
        const { name, category, price, foodType, image: itemImage } = itemData || {};
        if (!name || !category || !price || !foodType) continue;

        await Item.create({
          name,
          category,
          price,
          foodType,
          image: itemImage || "",
          shop: shop._id,
        });
      }
    }

    await shop.populate("owner");

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      shop,
    });


  } catch (error) {
     console.log("error during the shop create is", error);
     res.status(500).json({
       success: false,
       message:"internal server error "
     });
   }
  } 



export const getMyShop=async (req,res)=>{
    try{
      const userId = req.user?.userId;
   console.log("checking the user id in getMyShop Api:,",userId)
if (!userId) {
 return res.status(400).json({
success: false,
message: "owner did not found",
})
}

    // 🔹 First, find the shop for this owner (with owner populated)
    const shop = await Shop.findOne({ owner: userId }).populate("owner");
    if(!shop){
       return res.status(400).json({
success: false,
message: "shop did not found",
})
    }

    // 🔹 Then, fetch all items that belong to this shop using the `shop` field
    //    This does NOT rely on `shop.items` array being maintained.
    const items = await Item.find({ shop: shop._id });

    // 🔹 Merge items into the shop object so frontend can keep using `shop.items`
    const shopWithItems = {
      ...shop.toObject(),
      items,
    };

  return res.status(200).json({
     success: true,
     message: "Shop fetch successfully ",
     shop: shopWithItems,
   });


    }
    catch(error){
      console.log("error during getMyShop:",error)
    return res.status(400).json({
success: false,
message: "getMyShop did not found",
})
    }
  } 




  export const getAllItemsOfShop=async (req,res)=>{
    try{
           const userId = req.user?.userId;
   console.log("checking the user id in getMyShop Api:,",userId)
if (!userId) {
 return res.status(400).json({
success: false,
message: "owner did not found",
})
}
 const shop = await Shop.findOne({ owner: userId });
    if(!shop){
       return res.status(400).json({  
success: false,
message: "shop did not found",
})
    }
    // 🔹 Correct query: filter by this shop's _id
    const items = await Item.find({ shop: shop._id }).populate("shop");
    if(!items){ 
        return res.status(400).json({
success: false,
message: "items did not found",
})
    } 

     return res.status(200).json({
     success: true,
     message: "Items fetch successfully ",
     items,
   });
    }
    catch(error){
      console.log("error during getAllItemsOfShop:",error)
    return res.status(400).json({
success: false,
message: "getAllItemsOfShop did not found",
})
    } 
  }

