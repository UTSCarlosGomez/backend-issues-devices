import User from '../models/User' 
import axios from 'axios'

const createUser = async (req, res) => {
    const userData = req.body

    try {
        const auth0UserData = JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            connection: 'Username-Password-Authentication'
        })

        const auth0Config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://login.auth0.com/api/v2/users',
            headers: {
                'content-type': 'application/json',
                
            },
            data: auth0UserData
        }
        const user = new User(userData)

        await user.save()

        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}   