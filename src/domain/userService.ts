import { usersRepository } from '../repositories/usersRepository'
import { IUser } from './models/userModel'
import { IUserRegister, IUserLogin, IUpdateUserFields, IErrors } from '../types'
import fs, { unlink } from 'fs'

export const userService = {
  registerUser(data: IUserRegister): Promise<string | IErrors> {
    return usersRepository.registerUser(data)
  },
  loginUser(data: IUserLogin): Promise<string | IErrors> {
    return usersRepository.loginUser(data)
  },
  getUser(userId: string): Promise<IUser> {
    return usersRepository.getUser(userId)
  },
  updateUser(
    userData: IUpdateUserFields,
    userId: any,
    file?: any,
  ): Promise<IUser> {
    if (file) {
      if (userData.avatar) {
        console.log(`uploads/${userData.avatar}`)
        unlink(`uploads/${userData.avatar}`, () => {})
      }

      fs.readFileSync(file.path)
      userData.avatar = file.filename
    }

    return usersRepository.updateUser(userData, userId)
  },
}
