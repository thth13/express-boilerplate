import { checkSchema } from 'express-validator'

const validateLength = {
  isLength: { options: { max: 30 } },
  errorMessage: 'Maximum length 30 characters',
}

export const updateUserValidation = checkSchema({
  login: validateLength,
  firstName: validateLength,
  lastName: validateLength,
})
