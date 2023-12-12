import express from 'express'
import { eventos } from '../controllers/apiController.js'

const router = express.Router()

router.get('/eventos', eventos)

export default router