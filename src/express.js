import express from 'express'
import morgan from 'morgan'
import routes from './routes/index.js'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

app.use('/api/v1', routes)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})