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
      const formData = new FormData()
      formData.append('login', data.fields?.login)
      formData.append('firstName', data.fields?.firstName)
      formData.append('lastName', data.fields?.lastName)
      formData.append('avatar', data.fields?.avatar)

      const res = await api.put(`/users/update/${data.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      data.navigate(-1)
      return await res.data
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)
