import { app } from './src/express.js'
import databaseService from './src/service/DatabaseService.js'

await databaseService.connect()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})