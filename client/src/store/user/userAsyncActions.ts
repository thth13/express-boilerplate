import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'
import setAuthToken from '../../utils/setAuthToken'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: any, thunkAPI) => {
    try {
      const res = await api.post('/users/register', data)
      setAuthToken(res.data.token)
      thunkAPI.dispatch(getUser())
      return await res.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: any, thunkAPI) => {
    try {
      const res = await api.post('/users/login', data)
      setAuthToken(res.data.token)
      thunkAPI.dispatch(getUser())
      return await res.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const res = await api.get('/users')

    return await res.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const editUser = createAsyncThunk(
  'user/editUser',
  async (data: any, thunkAPI) => {
    try {
      const { fields, navigate } = data
      const formData = new FormData()

      formData.append('login', fields?.login)
      formData.append('firstName', fields?.firstName ? fields.firstName : '')
      formData.append('lastName', fields?.lastName ? fields.lastName : '')
      formData.append('avatar', fields?.avatar ? fields.avatar : '')

      const res = await api.put(`/users/update/${data.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate(-1)
      return await res.data
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: any, thunkAPI) => {
    try {
      await api.put(`/users/changepassword/${data.userId}`, data.fields)
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)
