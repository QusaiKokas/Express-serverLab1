import bcrypt from 'bcrypt'

// Hashas (bcrypt) som läraren kräver :contentReference[oaicite:9]{index=9}
const hashedDoePassword = bcrypt.hashSync('doe', 10)

export const users = [
  {
    username: 'doe',
    passwordHash: hashedDoePassword
  }
]