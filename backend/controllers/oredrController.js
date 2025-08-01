import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import razorpay from "razorpay"

// global variable
const currency = "inr"
const deliveryCharge = 10

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
    try {
        // Initialize Razorpay here, after dotenv.config() has run
        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const userId = req.user.id; // Get userId from token
        const { items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log("Razorpay error", error)
                return res.status(401).json({
                    success: false,
                    message: "Payment has failed",
                    error
                })
            }
            return res.status(200).json({
                success: true,
                message: "Payment has completed successfully",
                order
            })
        })

        
    } catch (error) {
        console.error("Error placing order with Razorpay:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// verify razorpay order id
const verifyRazorpayController = async (req, res) => {
    try {
        // Initialize Razorpay here
        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        // const userId = req.user.id; // Get userId from token
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)

        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.status(200).json({
                success: true,
                message: "Payment successful"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Payment failed"
            })
        }
        
    } catch (error) {
        console.error("Error placing order with Razorpay:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// All orders data for admin panel
const allOrdersControllers = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({
            success: true,
            message: "All orders data",
            orders
        })
        
    } catch (error) {
        console.error("Error fetching user orders data for admin panel:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}

// User order data for frontend
const userOrdersControllers = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token

        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user"
            });
        }

        res.status(200).json({
            success: true,
            orders
        });
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }

}

// update order status by admin
const updateOrderStatusControllers = async (req, res) => {
    try {
        const { orderId, status } = req.body
        
        await orderModel.findByIdAndUpdate(orderId, {status})

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            status
        })
        
    } catch (error) {
        console.log(error)
    }

}

export { verifyRazorpayController ,placeOrderCodControllers, placeOrderStripeControllers, placeOrderRazorpayControllers, allOrdersControllers, userOrdersControllers, updateOrderStatusControllers };