import { jwtSecret } from '../config/config'
import jwt from 'jsonwebtoken'
import { IUser } from './models/userModel'

export const signToken = (payload: IUser): string => {
  return jwt.sign({ userId: payload.id }, jwtSecret, {
    expiresIn: '5 days',
  })
}
