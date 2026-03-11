export function verifyAPIKey(req, res, next) {
  const expected = process.env.API_KEY

  // 1) query string: ?API_KEY=...
  const keyFromQuery = req.query.API_KEY || null

  // 2) header: Authorization: <key>  (samma stil som i lärarens exempel) 
  const keyFromHeader = req.header('Authorization') || null

  const supplied = keyFromQuery || keyFromHeader

  if (!supplied || supplied !== expected) {
    return res.status(403).json({
      type: 'forbidden',
      message: 'You have not supplied a valid API key!'
    })
  }

  next()
}