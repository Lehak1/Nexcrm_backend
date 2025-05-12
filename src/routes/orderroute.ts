import express from 'express';
import { jwtCheck, jwtParse, isAuthenticated } from '../middleware/Auth';
import {
  createOrder,
  getOrdersByCustomer,
  updateOrderStatus,
} from '../controllers/orderController';

const router = express.Router();

router.post('/', jwtCheck, jwtParse, isAuthenticated, createOrder);
router.get('/customer/:customerId', jwtCheck, jwtParse, isAuthenticated, getOrdersByCustomer);
router.patch('/:orderId/status', jwtCheck, jwtParse, isAuthenticated, updateOrderStatus);

export default router;
