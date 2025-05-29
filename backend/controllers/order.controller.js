import createError from "../utils/createError.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    console.log("Creating order with data:", req.body);
    const newOrder = new Order({
      ...req.body,
      buyerId: req.userId,
    });

    const savedOrder = await newOrder.save();
    console.log("Order created successfully:", savedOrder);
    res.status(201).send(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    console.log("Getting orders for user:", req.userId);
    console.log("Is seller:", req.isSeller);
    console.log("Query params:", req.query);
    
    let query = {};
    
    if (req.query.buyerId) {
      query = { buyerId: req.query.buyerId };
    } else {
      query = req.isSeller 
        ? { sellerId: req.userId }
        : { buyerId: req.userId };
    }
    
    console.log("Query:", query);
    
    const orders = await Order.find(query);
    console.log("Found orders:", orders);
    
    res.status(200).send(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    console.log("Getting order:", req.params.id);
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      console.log("Order not found");
      return next(createError(404, "Order not found!"));
    }
    
    if (order.buyerId !== req.userId && order.sellerId !== req.userId) {
      console.log("Unauthorized access attempt");
      return next(createError(403, "You are not authorized to view this order!"));
    }
    
    console.log("Order found:", order);
    res.status(200).send(order);
  } catch (err) {
    console.error("Error getting order:", err);
    next(err);
  }
}; 