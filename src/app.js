import express from 'express'
import { connectDb } from './db.js'
import deviceRoutes from './routes/deviceRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import issueRoutes from './routes/issueRoutes.js'
import userRoutes from './routes/userRoutes.js'

const PORT = 5000
const app = express()
app.use(express.json())

app.use('/devices', deviceRoutes)
app.use('/rooms', roomRoutes)
app.use('/issues', issueRoutes)
app.use('/users', userRoutes)

connectDb()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})