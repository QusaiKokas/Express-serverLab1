import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { users } from '../auth/users.js'

const router = express.Router()

// POST /api/v1/auth/login  body: { "username":"doe", "password":"doe" }
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username)
  if (!user) {
    return res.status(401).json({ error: 'Invalid login' })
  }

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) {
    return res.status(401).json({ error: 'Invalid login' })
  }

  // skapa token (minimal payload är best practice) :contentReference[oaicite:10]{index=10}
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  res.json({ token })
})

export default router