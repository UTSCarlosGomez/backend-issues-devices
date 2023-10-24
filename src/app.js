import express from 'express'
import { connectDb } from './db.js'
import deviceRoutes from './routes/deviceRoutes.js'
import roomRoutes from './routes/roomRoutes.js'

const PORT = 3000
const app = express()
app.use(express.json())

app.use('/devices', deviceRoutes)
app.use('/rooms', roomRoutes)

connectDb()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})