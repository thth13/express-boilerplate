import express from 'express'
import usersRouter from './routes/users'
import { port } from './config/config'
import { connectDB } from './config/db'

const app = express()

app.use(express.json())

connectDB()

// Routes
app.use('/api/users/', usersRouter)
app.use('/avatars', express.static('avatars'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
