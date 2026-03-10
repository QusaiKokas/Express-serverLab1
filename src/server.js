import 'dotenv/config'
import { app } from './express.js'
import databaseService from './service/DatabaseService.js'

await databaseService.connect()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})