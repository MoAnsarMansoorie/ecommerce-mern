import express from 'express';
import { addProductController, listProducrController, removeProducrController, singleProducrController } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Route for add product
router.post('/add', upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), addProductController);
// Route for list product
router.get('/list', listProducrController);
// Route for remove product
router.post('/remove/:id', removeProducrController);
// Route for single product info
router.post('/single/:id', singleProducrController);

export default router;