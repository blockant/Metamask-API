// This Index Router is the Master Router
import { Router } from "express";
import metaMaskRouter from './MetaMask'
const router = Router()

router.use('/transaction', metaMaskRouter)

export default router