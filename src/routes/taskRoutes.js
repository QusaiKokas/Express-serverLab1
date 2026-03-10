import express from 'express'
import * as taskController from '../controllers/taskController.js'

const router = express.Router()

router.get('/tasks', taskController.getAll)
router.get('/tasks/:id', taskController.getOne)
router.post('/tasks', taskController.create)
router.patch('/tasks/:id', taskController.patch)
router.delete('/tasks/:id', taskController.remove)

export default router