import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {userData: null, status: false}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
    },
    signup: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
    },
    logout: (state) => {
      state.userData = null
      state.status = false
    },
    update: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
    }
  }
})

export const { login, signup, logout, update } = userSlice.actions

export default userSlice.reducer