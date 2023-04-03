import express, { Request, Response } from "express";
import { Orders } from "./order";
import axios from "axios";

const router = express.Router();

// POST /orders
router.post("/", async (req: Request, res: Response) => {
  try {
    const { customerName, email, products } = req.body;

    // Check inventory levels with the inventory server
    const canFulfillOrder = await checkInventoryLevels(products);

    if (!canFulfillOrder) {
      return res.status(400).json({
        message: "Cannot fulfill order due to insufficient inventory.",
      });
    }

    // Create the order
    const order = await Order.create({ customerName, email, products });

    // Update inventory levels on the inventory server
    await updateInventoryLevels(products);

    return res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// GET /orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(