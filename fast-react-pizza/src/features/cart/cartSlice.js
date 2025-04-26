import { createSlice } from "@reduxjs/toolkit"



const initalState = {
    cart : []

}


const cartSlice = createSlice({
    name : "cart",
    initialState : initalState,
    reducers : {
        addItem(state,action){
            // payload = newItem
            state.cart.push(action.payload)
            
        }, 
        deleteItem(state,action){
            //payload = pizzaId
           state.cart =  state.cart.filter((item) => item.pizzaId != action.payload  )
        },
        increase(state,action){
            const item = state.cart.find((item) => item.pizzaId === action.payload )

            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice

        },
        decrease(state,action){

            const item = state.cart.find((item) => item.pizzaId === action.payload )
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice

            if(item.quantity === 0 ) cartSlice.caseReducers.deleteItem(state,action)
            
        },
        clearCart(state,action){
            state.cart = []
        },     
    }
})

export const  {clearCart,decrease,increase,deleteItem,addItem} = cartSlice.actions

export const getCartQuantity =  state => state.cart?.cart?.reduce((sum,item) => sum + item.quantity , 0 );

export const getCartPrice = state => state.cart.cart.reduce((sum ,item) =>  sum + item.totalPrice , 0 )

export const getCart = state => state.cart?.cart;

export const getCurrentQuantityById = id => state => state.cart.cart.find((item) => item.pizzaId === id  )?.quantity ?? 0;


export default cartSlice.reducer;