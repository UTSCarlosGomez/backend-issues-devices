import User from '../models/User.js' 

const createUser = async (req, res) => {
    const userData = req.body

    try {
        const user = new User(userData)

        await user.save()

        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getUsers = async (_, res) => {
    try {
        const users = await User.find()

        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = User.findById(id)

        if (!user) return res.status(404).json({ message: 'User not found' })

        return res.json(user)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const userData = req.body

    try {
        const user = User.findById(id)

        if (user) {
            user.name = userData.name
            user.lastname = userData.lastname
            user.email = userData.email

            await user.save()

            res.json(user)
        }

        return res.status(404).json({ message: 'User not found' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = User.findById(id)

        if (user) {
            await user.remove()

            return res.json({ message: 'User deleted' })
        }

        return res.status(404).json({ message: 'User not found' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}