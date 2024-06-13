import { checkSchema } from 'express-validator'

const validateLength = {
  isLength: { options: { max: 30 } },
  errorMessage: 'Maximum length 30 characters',
}

export const changePasswordValidation = checkSchema({
  newPassword: {
    isLength: { options: { min: 4, max: 100 } },
    errorMessage: 'Minimum password length 4 characters',
  },
})

export const updateUserValidation = checkSchema({
  login: {
    isLength: { options: { min: 4, max: 30 } },
    errorMessage: 'Minimum length 4, maxumum 30 characters',
  },
  firstName: validateLength,
  lastName: validateLength,
})
