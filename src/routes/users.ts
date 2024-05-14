import express, { Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import { IUser } from '../domain/models/userModel'
import { userService } from '../domain/userService'
import { checkAuth } from '../middlewares/checkAuth'
import { inputValidation } from '../middlewares/inputValidation'
import { updateUserValidation } from '../middlewares/validation/editProfile'
import {
  loginUserValidation,
  registerUserValidation,
} from '../middlewares/validation/register'
import {
  IErrors,
  IUpdateUserFields,
  IUserAuth,
  IUserLogin,
  IUserRegister,
  RequestWithBody,
  RequestWithParamsAndBody,
  URIParamsUserIdModel,
} from '../types'

export const upload = multer({ dest: 'uploads/' })
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
    res: Response<Object | IErrors>,
  ) => {
    try {
      const token = await userService.registerUser(req.body)

      res.status(200).json({ token })
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
  async (req: RequestWithBody<IUserLogin>, res: Response<Object | IErrors>) => {
    try {
      const token = await userService.loginUser(req.body)

      res.status(200).json({ token })
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

// @route   PUT api/user/update
// @desc    Update user
// @access  Private
router.put(
  '/update/:id',
  checkAuth,
  updateUserValidation,
  inputValidation,
  upload.single('avatar'),
  async (
    req: RequestWithParamsAndBody<URIParamsUserIdModel, IUpdateUserFields>,
    res: Response<IUser>,
  ) => {
    try {
      // find user id and get avatat field for deleting in updateUser
      const updatedUser = await userService.updateUser(
        req.body,
        req.params.id,
        req.file,
      )

      res.status(200).json(updatedUser)
    } catch (err: any) {
      console.log(err)
      res.status(400).json(err)
    }
  },
)

export default router
