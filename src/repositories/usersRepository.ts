import bcrypt from 'bcryptjs'
import {
  IUserRegister,
  IUserLogin,
  IUpdateUserFields,
  IErrors,
  IChangePassword,
} from '../types'
import { IUser, User } from '../domain/models/userModel'
import { signToken } from '../domain/utils'

export const usersRepository = {
  async registerUser(data: IUserRegister): Promise<string | IErrors> {
    const { login, email, password } = data

    const isUserExist: IUser | null = await User.findOne({
      $or: [{ login }, { email }],
    })

    if (isUserExist) {
      throw {
        errors: [
          { msg: 'User already exists', path: 'email' },
          { msg: 'User already exists', path: 'login' },
        ],
      }
    }
    const newUser: IUser = new User({ login, email, password })
    await newUser.save()

    return signToken(newUser)
  },

  async loginUser(data: IUserLogin): Promise<string | IErrors> {
    const { email, password } = data

    const user = await User.findOne({ email })
    const invalidCredentialsError = {
      errors: {
        email: 'Invalid Credentials',
        password: 'Invalid Credentials',
      },
    }

    if (!user) {
      throw invalidCredentialsError
    }

    const isMatchPassword = await bcrypt.compare(password, user.password)

    if (isMatchPassword !== true) {
      throw invalidCredentialsError
    }

    return signToken(user)
  },

  async getUser(userId: string): Promise<IUser> {
    const user = await User.findById(userId).select('-password')

    if (!user) {
      throw { msg: 'User is not found' }
    }

    return user
  },

  async changePassword(
    data: IChangePassword,
    userId: any,
  ): Promise<string | IErrors> {
    const { oldPassword, newPassword, confirmPassword } = data

    if (newPassword !== confirmPassword) {
      throw { confirmPassword: 'Passwords do not match' }
    }

    const user = await User.findById(userId)

    if (!user) {
      // TODO: сделать обработку этих ошибок
      throw { msg: 'User is not found' }
    }

    const isMatchPassword = await bcrypt.compare(oldPassword, user.password)

    if (isMatchPassword !== true) {
      throw { oldPassword: 'Wrong old password' }
    }

    user.password = newPassword
    await user.save()

    return 'Password changed successfully'
  },

  async updateUser(userData: IUpdateUserFields, userId: any): Promise<IUser> {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $set: userData },
      { new: true, upsert: true, setDefaultOnInsert: true },
    )
  },
}
