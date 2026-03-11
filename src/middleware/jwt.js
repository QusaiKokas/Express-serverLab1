import jwt from 'jsonwebtoken'

export function jwtTokenIsValid(req, res, next) {
  const auth = req.header('Authorization') || ''

  // Stöd både "Bearer <token>" och bara "<token>"
  const token = auth.startsWith('Bearer ')
    ? auth.substring('Bearer '.length)
    : auth

  try {
    // samma idé som i lärarens middleware: verify + spara payload :contentReference[oaicite:11]{index=11}
    res.locals.jwt = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or missing JWT token' })
  }
}