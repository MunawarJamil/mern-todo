import express from "express";
import productModel from "../models/product.model.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    res
      .status(200)
      .json({ message: "all products fetched", data: allProducts });
  } catch (error) {
    console.log("cannot get any product");
    res.status(500).json({ message: "server error " });
  }
});

// product router
router.post("/", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price) {
    return res.status(400).json({
      success: false,
      message: "please provide name and price of the product",
    });
  }
  const newProduct = new productModel(product);
  try {
    await newProduct.save();
    return res.status(200).json({
      success: true,
      message: "product has created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("error while creating product ", error.message);

    res.status(500).json({ success: false, message: "server error..." });
  }
});

//update product

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const productToUpdate = req.body;

  try {
    const updateProdect = await productModel.findByIdAndUpdate(
      id,
      productToUpdate,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: updateProdect,
    });
  } catch (error) {}
});

//delete any product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
});

export default router;
