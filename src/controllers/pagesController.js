function parseDateFromQuery(dateStr) {
  if (!dateStr) return new Date()
  const d = new Date(dateStr)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

export function landing(req, res) {
  res.render('index')
}

export function friday(req, res) {
  const date = parseDateFromQuery(req.query.date)
  const weekday = date.toLocaleDateString('sv-SE', { weekday: 'long' })
  const dateString = date.toISOString().slice(0, 10)

  // JS: 5 = Friday
  const isFriday = date.getDay() === 5

  res.render('friday', {
    dateString,
    weekday,
    isFriday
  })
}