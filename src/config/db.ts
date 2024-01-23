import mongoose from 'mongoose'
import { mongoUri } from './config'

mongoose.set('strictQuery', false)

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri)

    console.log('MongoDB Connected...')
  } catch (err: any) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}
