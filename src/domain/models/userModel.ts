import bcrypt from 'bcryptjs'
import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  login: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  birthdate?: Date
  avatar?: string
  date: Date
}

const UserSchema = new Schema<IUser>({
  login: { type: String, required: true, uniuque: true },
  email: { type: String, required: true, uniuque: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  birthdate: { type: Date },
  date: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function (next) {
  const user = this
  const saltRounds = 8

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }

  next()
})

export const User = model<IUser>('User', UserSchema)
