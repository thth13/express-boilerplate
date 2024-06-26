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

// TODO: валидация не отрабатывает потому что приходит form-data
export const updateUserValidation = checkSchema({
  login: validateLength,
  firstName: validateLength,
  lastName: validateLength,
})
