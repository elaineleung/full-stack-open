const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

morgan.token('content', (req, res) => {
    const person = {"name": req.body.name, "number": req.body.number}
    return JSON.stringify(person)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    { 
        name: 'Arto Hellas', 
        number: '040-123456',
        id: 1
    },
    { 
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
    },
    { 
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    { 
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
  ]

app.get('/info', (req, res) => {
    const time = new Date()
    res.send(`<div><p>Phonebook has info for ${persons.length} people.</p><p>${time}</p></div>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateID = () => {
    const maxID = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    const newnum = maxID===0 ? 1 : maxID + 10 
    const idArray = persons.map(p => maxID===0 ? 0 : p.id)
    const randomArray = new Array(newnum).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
    const diffArray = randomArray.filter(num => !idArray.includes(num))
    return  diffArray.find(num => num > maxID)
}

app.post('/api/persons', (req, res) => {
    const person = req.body
    const sameName = persons.find(p => p.name===person.name)

    return (
        sameName 
        ?   res.status(400).json({
                error: "This person is already in the phonebook!"
        })
        :   !person.name || !person.number 
        ?   res.status(400).json({
                error: "Name or number is missing!"
        })
        :   (person.id = generateID()) 
        &&  (persons = persons.concat(person)) 
        &&  res.json(person)
    )    
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})