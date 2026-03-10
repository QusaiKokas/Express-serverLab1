import databaseService from '../service/DatabaseService.js'

export async function getAll() {
  const [rows] = await databaseService.db().execute(
    'SELECT id, title, done, created_at FROM tasks ORDER BY id DESC'
  )
  return rows
}

export async function getById(id) {
  const [rows] = await databaseService.db().execute(
    'SELECT id, title, done, created_at FROM tasks WHERE id = ?',
    [id]
  )
  return rows[0] || null
}

export async function create({ title, done = false }) {
  const [result] = await databaseService.db().execute(
    'INSERT INTO tasks (title, done) VALUES (?, ?)',
    [title, done]
  )
  return getById(result.insertId)
}

export async function updatePartial(id, patch) {
  const current = await getById(id)
  if (!current) return null

  const nextTitle = patch.title ?? current.title
  const nextDone = patch.done ?? current.done

  await databaseService.db().execute(
    'UPDATE tasks SET title = ?, done = ? WHERE id = ?',
    [nextTitle, nextDone, id]
  )
  return getById(id)
}

export async function remove(id) {
  const [result] = await databaseService.db().execute(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  )
  return result.affectedRows > 0
}