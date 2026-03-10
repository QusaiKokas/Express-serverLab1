import * as taskModel from '../models/taskModel.js'

export async function getAll(req, res) {
  const tasks = await taskModel.getAll()
  res.json(tasks)
}

export async function getOne(req, res) {
  const id = Number(req.params.id)
  const task = await taskModel.getById(id)
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
}

export async function create(req, res) {
  const { title, done = false } = req.body
  if (!title) return res.status(400).json({ error: 'title is required' })

  const created = await taskModel.create({ title, done })
  res.status(201).json(created)
}

export async function patch(req, res) {
  const id = Number(req.params.id)
  const updated = await taskModel.updatePartial(id, req.body)
  if (!updated) return res.status(404).json({ error: 'Task not found' })
  res.json(updated)
}

export async function remove(req, res) {
  const id = Number(req.params.id)
  const ok = await taskModel.remove(id)
  if (!ok) return res.status(404).json({ error: 'Task not found' })
  res.status(204).send()
}