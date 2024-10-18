const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
      {
        "id": 1,
        "content": "Revisar el código del proyecto antes de la reunión.",
        "date": "2024-10-16",
        "important": true
      },
      {
        "id": 2,
        "content": "Comprar ingredientes para la cena.",
        "date": "2024-10-15",
        "important": false
      },
      {
        "id": 3,
        "content": "Enviar el informe semanal.",
        "date": "2024-10-14",
        "important": true
      },
      {
        "id": 4,
        "content": "Actualizar el sistema operativo.",
        "date": "2024-10-13",
        "important": false
      }
    ]

    /*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})
  */

app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>")
})

app.get('/api/notes', (request, response) => {  
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {  
    const id = Number(request.params.id)
    const found_note = notes.find(note => note.id === id)
    if (found_note){
        response.json(found_note)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {  
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: "note.content is missing"
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: note.important ?? false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
