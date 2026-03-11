import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import session from 'express-session'
import flash from 'connect-flash'
import path from 'path'
import { fileURLToPath } from 'url'

import apiRoutes from './routes/index.js'
import webRoutes from './routes/web.js'

export const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.disable('x-powered-by')
app.use(helmet())

app.use(morgan('dev'))
app.use(express.json())

// För HTML-formulär (POST)
app.use(express.urlencoded({ extended: false }))

// Public (CSS)
app.use(express.static(path.join(process.cwd(), 'public')))

// EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Session + flash
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

// Gör flash tillgänglig i alla views
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error')
  }
  next()
})

// Webbsidor
app.use('/', webRoutes)

// API (som innan)
app.use('/api/v1', apiRoutes)

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }))