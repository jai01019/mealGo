import uploadOnCloudinary from "../utils/cloudinary.js";
import { Shop } from "../models/shop.model.js";

export const createEditShop = async (req, res) => {
  
  try {
    const { name, state, address, city, items } = req.body;
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
     shop.name = name;
     shop.state = state;
shop.address = address;
      shop.items = items;
        shop.city = city;
      if (image) shop.image = image;
      await shop.save();
      await shop.populate("owner");
      return res.status(200).json({
        success: true,
        message: "Shop updated successfully",
        shop,
      });
    }

    shop = await Shop.create({ 
      name,
       state,
        address,
         city,
          items,
          image,
          owner

         });



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