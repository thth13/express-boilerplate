import { Dispatch } from 'redux'
import { UserActionTypes, UserActions } from '../../types/user'

export const getUser = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      // const res = await axios.get('')
      // dispatch({
      //   type: UserActionTypes.GET_USER,
      //   payload: null,
      // })
    } catch (e) {
      dispatch({
        type: UserActionTypes.GET_ERROR,
        payload: 'Error user load',
      })
    }
  }
}
