import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const localData = sessionStorage.getItem("userData")
  ? JSON.parse(sessionStorage.getItem("userData") as string)
  : null;
const localStatus = sessionStorage.getItem("status")
  ? JSON.parse(sessionStorage.getItem("status") as string)
  : false;


const initialState = { userData: localData, status: localStatus }


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
      sessionStorage.setItem("userData", JSON.stringify(action.payload))
      sessionStorage.setItem("status", JSON.stringify(true))
    },
    signup: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
      sessionStorage.setItem("userData", JSON.stringify(action.payload))
      sessionStorage.setItem("status", JSON.stringify(true))
    },
    logout: (state) => {
      state.userData = null
      state.status = false
      sessionStorage.clear();
      sessionStorage.setItem("status", JSON.stringify(false))
    },
    update: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      state.status = true
      sessionStorage.setItem("userData", JSON.stringify(action.payload))
      sessionStorage.setItem("status", JSON.stringify(true))
    }
  }
})

export const { login, signup, logout, update } = userSlice.actions

export default userSlice.reducer