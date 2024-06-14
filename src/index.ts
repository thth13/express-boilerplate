import express from 'express'
import usersRouter from './routes/users'
import path from 'path'
import { port } from './config/config'
import { connectDB } from './config/db'

const app = express()

app.use(express.json())

connectDB()

// Routes
app.use('/api/users/', usersRouter)
app.use('/uploads', express.static('uploads'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
