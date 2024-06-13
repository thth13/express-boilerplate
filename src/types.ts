import { Request } from 'express'

export interface IUserLogin {
  email: string
  password: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IUserRegister extends IUserLogin {
  login: string
  confirmPassword?: string
}

// TODO: Как правильно сделать тип?
export interface IErrors {
  errors: object
}

export interface IUserAuth {
  id: string
}

// TODO: переделать на omit
export interface IUpdateUserFields {
  id?: string
  login?: string
  firstName?: string
  lastName?: string
  age?: number
  avatar?: string
}

export type URIParamsUserIdModel = {
  id: string
}

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>
