import Note from '../models/Note.js'
import User from '../models/User.js'

const createNote = async (req, res) => {
    const noteData = req.body

    try {
        const user = User.findById(noteData.creatorId)

        const note = new Note({
            content: noteData.content,
            creator: {
                id: user._id,
                name: user.name
            }
        })

        await note.save()

        res.status(201).json(note)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find()

        res.json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params
    const noteData = req.body

    try {
        const note = Note.findById(id)
        
        if (note) {
            note.content = noteData.content

            await note.save()

            res.json(note)
        }

        res.status(404).json({ message: 'Note not found' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params

    try {
        const note = Note.findById(id)

        if (note) {
            await note.remove()

            res.json({ message: 'Note removed' })
        }

        res.status(404).json({ message: 'Note not found' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export { createNote, getNotes, updateNote, deleteNote }