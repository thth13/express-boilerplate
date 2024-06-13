import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../types/user'
import {
  editUser,
  getUser,
  loginUser,
  registerUser,
  changePassword,
} from './userAsyncActions'

const initialState: UserState = {
  user: null,
  loading: false,
  errors: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = {}
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload }
    },
    logOut: (state) => {
      state.user = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.errors = {}
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.errors = action.payload
        state.loading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false
        state.errors = {}
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.errors = action.payload
        state.loading = false
      })
      .addCase(editUser.pending, (state, action: PayloadAction<any>) => {
        state.loading = true
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload
        state.loading = false
        state.errors = {}
      })
      .addCase(editUser.rejected, (state, action: PayloadAction<any>) => {
        state.errors = action.payload
        state.loading = false
      })
      .addCase(changePassword.pending, (state) => {
        state.errors = {}
        state.loading = true
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.errors = action.payload
        state.loading = false
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
      })
  },
})

export const { clearErrors, logOut, setErrors } = userSlice.actions

export default userSlice.reducer
