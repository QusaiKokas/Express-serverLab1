import express from 'express'
import * as pagesController from '../controllers/pagesController.js'
import * as webTasksController from '../controllers/webTasksController.js'

const router = express.Router()

// Landing
router.get('/', pagesController.landing)

// Friday
router.get('/friday', pagesController.friday)

// Tasks WEB (CRUD med formulär)
router.get('/tasks', webTasksController.list)
router.get('/tasks/new', webTasksController.newForm)
router.post('/tasks', webTasksController.create)

router.get('/tasks/:id', webTasksController.show)
router.get('/tasks/:id/edit', webTasksController.editForm)
router.post('/tasks/:id/update', webTasksController.update)
router.post('/tasks/:id/delete', webTasksController.remove)

export default router