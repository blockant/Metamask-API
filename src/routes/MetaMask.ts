import { Router } from "express";
const router = Router()
import MetaMaskController from "../controllers/MetaMask";

router.post('/url', MetaMaskController.getTransactionURL)

router.get('/history', MetaMaskController.getHistory)

router.post('/', MetaMaskController.makePayment)
export default router