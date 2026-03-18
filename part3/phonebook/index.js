const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan((tokens, req, res) => (
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
)))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `
      <p>Phonebook has info of ${persons.length} people</p>
      <p>${new Date()}</p>
    `
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if(person) res.json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if(!body.name || !body.number) {
    res.status(400).json({error: 'Both name and number are required'})
    return
  } else if(persons.map(p => p.name).includes(body.name)) {
    res.status(400).json({error: 'Name must be unique'})
    return
  }

  const person = {
    id: String(Math.floor(Math.random() * 10000)),
    name: body.name,
    number: body.number
  }

  persons = [...persons, person]
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
