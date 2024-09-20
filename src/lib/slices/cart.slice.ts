import Product from "@/@types/product"
import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

export interface CartState {
  products: Product[]
}

const initialState: CartState = { 
  products: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const productIndex = state.products.findIndex(product => product.id === action.payload.id)

      if (productIndex !== -1) {
        state.products[productIndex] = action.payload
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload.id)
    },
    clearCart: state => {
      state.products = []
    },
  }, 
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      }
    })
  }
})

export const {} = cartSlice.actions

export default cartSlice.reducer