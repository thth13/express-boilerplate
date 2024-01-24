import { UserActionTypes, UserActions, UserState } from '../../types/user'

const initialState = {
  user: null,
  loading: false,
  error: null,
}

export const userReducer = (
  state = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return {
        loading: true,
        error: null,
        user: action.payload,
      }
    case UserActionTypes.GET_ERROR:
      return {
        loading: true,
        error: action.payload,
        user: null,
      }
    default:
      return state
  }
}
