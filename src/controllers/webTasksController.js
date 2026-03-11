import * as taskModel from '../models/taskModel.js'

function toBool(v) {
  // checkbox i forms: "on" eller undefined
  return v === 'on' || v === true || v === 1 || v === '1'
}

export async function list(req, res) {
  const tasks = await taskModel.getAll()
  res.render('tasks/list', { tasks })
}

export function newForm(req, res) {
  res.render('tasks/new')
}

export async function create(req, res) {
  const title = (req.body.title || '').trim()
  const done = toBool(req.body.done)

  if (!title) {
    req.flash('error', 'Title is required.')
    return res.redirect('/tasks/new')
  }

  await taskModel.create({ title, done })
  req.flash('success', 'Task created!')
  res.redirect('/tasks')
}

export async function show(req, res) {
  const id = Number(req.params.id)
  const task = await taskModel.getById(id)
  if (!task) {
    req.flash('error', 'Task not found.')
    return res.redirect('/tasks')
  }
  res.render('tasks/show', { task })
}

export async function editForm(req, res) {
  const id = Number(req.params.id)
  const task = await taskModel.getById(id)
  if (!task) {
    req.flash('error', 'Task not found.')
    return res.redirect('/tasks')
  }
  res.render('tasks/edit', { task })
}

export async function update(req, res) {
  const id = Number(req.params.id)
  const title = (req.body.title || '').trim()
  const done = toBool(req.body.done)

  const updated = await taskModel.updatePartial(id, { title, done })
  if (!updated) {
    req.flash('error', 'Task not found.')
    return res.redirect('/tasks')
  }

  req.flash('success', 'Task updated!')
  res.redirect(`/tasks/${id}`)
}

export async function remove(req, res) {
  const id = Number(req.params.id)
  const ok = await taskModel.remove(id)

  if (!ok) {
    req.flash('error', 'Task not found.')
    return res.redirect('/tasks')
  }

  req.flash('success', 'Task deleted!')
  res.redirect('/tasks')
}