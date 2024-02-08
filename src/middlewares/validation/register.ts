import { checkSchema } from 'express-validator'

const requiredWithErrorMessage = {
  exists: true,
  errorMessage: 'Field is required',
}

// TODO: возможно добавить валидацию confirmPassword
export const registerUserValidation = checkSchema({
  login: {
    ...requiredWithErrorMessage,
    isLength: { options: { min: 3, max: 30 } },
  },
  email: { isEmail: true, errorMessage: 'Enter a corrent email' },
  password: {
    isLength: { options: { min: 6, max: 100 } },
    errorMessage: 'Minimum password length 6 characterse',
  },
})

export const loginUserValidation = checkSchema({
  email: { ...requiredWithErrorMessage },
  password: { ...requiredWithErrorMessage },
})
