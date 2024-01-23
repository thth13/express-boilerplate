import express, { Request, Response } from 'express'
import { inputValidation } from '../middlewares/inputValidation'
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../middlewares/validation/register'
import { userService } from '../domain/userService'
import {
  IErrors,
  IUserLogin,
  IUserRegister,
  IUserAuth,
  IUpdateUserFields,
  RequestWithBody,
} from '../types'
import { checkAuth } from '../middlewares/checkAuth'
import { IUser } from '../domain/models/userModel'

const router = express.Router()

// @route   POST api/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  registerUserValidation,
  inputValidation,
  async (
    req: RequestWithBody<IUserRegister>,
    res: Response<string | IErrors>,
  ) => {
    try {
      const newUserToken = await userService.registerUser(req.body)

      res.status(200).json(newUserToken)
    } catch (err: any) {
      // TODO: как правильно обработать ошибку
      if (err.errors) res.status(400).json(err)
      // console.error(err.message)
    }
  },
)

// @route   POST api/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  loginUserValidation,
  inputValidation,
  async (req: RequestWithBody<IUserLogin>, res: Response<string | IErrors>) => {
    try {
      const userToken = await userService.loginUser(req.body)

      res.status(200).json(userToken)
    } catch (err: any) {
      // TODO: как правильно обработать ошибку
      if (err.errors) res.status(400).json(err)
    }
  },
)

// @route   POST api/user
// @desc    Get current user
// @access  Private
router.get(
  '/',
  checkAuth,
  async (req: RequestWithBody<IUserAuth>, res: Response<IUser>) => {
    try {
      const user = await userService.getUser(req.body.id)

      res.status(200).json(user)
    } catch (err: any) {
      res.status(400).json(err)
    }
  },
)

// @route   POST api/user/update
// @desc    Update user
// @access  Private
router.put(
  '/update',
  checkAuth,
  updateUserValidation,
  inputValidation,
  async (req: RequestWithBody<IUpdateUserFields>, res: Response<IUser>) => {
    try {
      const updatedUser = await userService.updateUser(req.body)

      res.status(200).json(updatedUser)
    } catch (err: any) {
      console.log(err)
      res.status(400).json(err)
    }
  },
)

export default router
