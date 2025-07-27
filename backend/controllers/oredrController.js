import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";


// Placing order using COD method
const placeOrderCodControllers = async (req, res) => { 
    try {
        const userId = req.user.id; // Get userId from token
        const { items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Error placing order with COD:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Placing order using Stripe Method
const placeOrderStripeControllers = async (req, res) => { 

}

// Placing order using Razorpay Method
const placeOrderRazorpayControllers = async (req, res) => {

}

// All orders data for admin panel
const allOrdersControllers = async (req, res) => {

}

// User order data for frontend
const userOrdersControllers = async (req, res) => {

}

// update order status by admin
const updateOrderStatusControllers = async (req, res) => {

}

export { placeOrderCodControllers, placeOrderStripeControllers, placeOrderRazorpayControllers, allOrdersControllers, userOrdersControllers, updateOrderStatusControllers };