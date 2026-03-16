const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send(`<h1>Hellooo!!<h1>`)
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(n => n.id === id)

  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(n => n.id !== id)

  res.status(204).end()
})

const generateID = () => {
  const maxID = notes.length > 0
                  ? Math.max(...(notes.map(n => Number(n.id))))
                  : 0
  
  return String(maxID + 1)
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.content) {
    res.status(400).json({error: 'Content missing'})
    return
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateID()
  }

  notes = [...notes, note]

  res.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
