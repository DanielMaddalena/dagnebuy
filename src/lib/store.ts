import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit"

import { cartSlice } from "@/lib/slices/cart.slice"

const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export const makeStore = () => {
  const isServer = typeof window === "undefined"

  if (isServer) return makeConfiguredStore()

  const store: any = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  })

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>

export const store = makeStore()