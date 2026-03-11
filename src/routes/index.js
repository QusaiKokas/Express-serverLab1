import express from 'express'
import taskRoutes from './taskRoutes.js'
import apiKeyRoutes from './apiKeyRoutes.js'
import authRoutes from './authRoutes.js'
import jwtRoutes from './jwtRoutes.js'

const router = express.Router()
router.use(taskRoutes)
router.use(apiKeyRoutes)
router.use(authRoutes)
router.use(jwtRoutes)

export default router