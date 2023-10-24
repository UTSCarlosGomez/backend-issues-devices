import Room from '../models/Room.js'

const createRoom = async (req, res) => {
    const roomData = req.body

    const room = new Room({
        name: roomData.name
    })

    try {
        await room.save()

        res.status(201).json(room)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getRoom = async (req, res) => {
    const { id } = req.params

    try {
        const room = Room.findById(id)

        if (room) {
            res.json(room)
        }

        res.status(404).json({ message: 'Room not found' })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()

        res.json(rooms)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateRoom = async (req, res) => {
    const { id } = req.params
    const roomData = req.body

    try {
        const room = await Room.findById(id)

        if (room) {
            room.name = roomData.name

            await room.save()

            res.json(room)
        }

        res.status(404).json({ message: 'Room not found' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteRoom = async (req, res) => {
    const { id } = req.params

    try {
        const room = await Room.findById(id)

        if (room) {
            await room.remove()

            res.json({ message: 'Room removed' })
        }

        res.status(404).json({ message: 'Room not found' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    createRoom,
    getRoom,
    getRooms,
    updateRoom,
    deleteRoom
}