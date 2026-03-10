import mysql from 'mysql2/promise'
import { dbConfig } from '../config/database.js'

class DatabaseService {
  pool = null

  async connect() {
    if (this.pool) return
    this.pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10
    })
    await this.pool.query('SELECT 1')
    console.log('Database connected')
  }

  db() {
    if (!this.pool) throw new Error('Database not connected')
    return this.pool
  }
}

export default new DatabaseService()