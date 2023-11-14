import Device from '../models/Device.js'
import Room from '../models/Room.js'

const createDevice = async (req, res) => {
    const deviceData = req.body

    const room = await Room.findById(deviceData.roomId).exec()

    const device = new Device({
        code: deviceData.code,
        brand: deviceData.brand,    
        description: deviceData.description,
        room: {
            id: room._id,
            name: room.name
        }
    })

    try {
        await device.save()

        return res.status(201).json(device)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const getDevice = async (req, res) => {
    const { id } = req.params

    try {
        const device = await Device.findById(id).exec()

        if (device) {
            return res.json(device)
        }

        return res.status(404).json({ message: 'Device not found' })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const getDevices = async (req, res) => {
    try {
        const devices = await Device.find()

        return res.json(devices)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateDevice = async (req, res) => {
    const { id } = req.params
    const deviceData = req.body

    try {
        const device = await Device.findById(id).exec()

        if (device) {
            device.code = deviceData.code
            device.brand = deviceData.brand
            device.description = deviceData.description

            await device.save()

            return res.json(device)
        }

        return res.status(404).json({ message: 'Device not found' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const deleteDevice = async (req, res) => {
    const { id } = req.params

    try {
        const device = await Device.findById(id).exec()

        if (device) {
            await device.remove()

            return res.json({ message: 'Device removed' })
        }

        return res.status(404).json({ message: 'Device not found' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export { createDevice, getDevice, getDevices, updateDevice, deleteDevice }