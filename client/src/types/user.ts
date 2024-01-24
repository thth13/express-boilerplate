import { IUser } from '../../../src/domain/models/userModel'

export enum UserActionTypes {
  GET_USER = 'GET_USER',
  GET_ERROR = 'GET_ERROR',
}

export interface UserState {
  user: IUser | null
  loading: boolean
  error: string | null
}

interface FetchUserAction {
  type: UserActionTypes.GET_USER
  payload: IUser
}

interface FetchUserError {
  type: UserActionTypes.GET_ERROR
  payload: string
}

export type UserActions = FetchUserAction | FetchUserError
