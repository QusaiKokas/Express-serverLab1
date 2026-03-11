import express from 'express'
import { verifyAPIKey } from '../middleware/apiKey.js'
const router = express.Router()

// GET /api/v1/apikey/answer (skyddad)
router.get('/apikey/answer', verifyAPIKey, (req, res) => {
  res.json({ message: 'YES. The magic answer is 42!' })
})

export default router
