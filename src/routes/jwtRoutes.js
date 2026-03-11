import express from 'express'
import { jwtTokenIsValid } from '../middleware/jwt.js'

const router = express.Router()

// GET /api/v1/jwt/protected
router.get('/jwt/protected', jwtTokenIsValid, (req, res) => {
  res.json({
    message: 'JWT OK - you reached a protected route!',
    payload: res.locals.jwt
  })
})

export default router