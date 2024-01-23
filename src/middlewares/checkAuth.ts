import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/config'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized' })
  }

  try {
    jwt.verify(token, jwtSecret, (error, decoded: any) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      } else {
        req.body.id = decoded.userId
        next()
      }
    })
  } catch (err) {
    console.error('Something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
