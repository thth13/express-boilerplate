import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

// TODO: Сделать вместе с валидацией
export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.send({ errors: result.array() })
  } else {
    next()
  }
}
