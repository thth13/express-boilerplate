import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

// TODO: Сделать вместе с валидацией
export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorFormatter = ({ msg }: any) => msg

  const result = validationResult(req).formatWith(errorFormatter)

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.mapped() })
  } else {
    next()
  }
}
