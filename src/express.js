import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes/index.js'

export const app = express()

app.disable('x-powered-by')        // minskar fingerprinting :contentReference[oaicite:4]{index=4}
app.use(helmet())                  // lägger säkerhetsheaders 

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'API is running' }))

app.use('/api/v1', routes)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))