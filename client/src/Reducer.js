import { getToggleButtonGroupUtilityClass } from "@mui/material";

const Reducer = (state, action)=>{
    
    if(action.type === 'ADD_TO_CART') {
        if(!state.isLogin) {
            alert('please Login to contenuo to Buy')
        }
        let check = state.cart.every((item)=>item._id !== action.payload._id)
        let tempcart = state.cart;
        if(check){
            tempcart = [...state.cart, {...action.payload.item, qty: action.payload.qty}]
        }
        return {...state, cart: tempcart}
    }
    
    if(action.type === 'GET_USER_API_SUCCESS') {
        return {...state,
            isLogin: action.payload.isLogin, 
            isAdmin: action.payload.isAdmin, 
            user: action.payload.user
        }
    }
    if(action.type === 'SHOW_NAV_BAR'){
        return{...state, showNavBar: true}
    }
    if(action.type === 'HIDE_NAV_BAR'){
        return{...state, showNavBar: false}
    }
    if(action.type === 'INC_TO_CART'){
        const tempCart = state.cart.map((item)=>{
            if(item._id === action.payload){
                return {...item, qty: item.qty +1}
            }
            return item
        })
        return{...state, cart: tempCart}
    }
    if(action.type === 'DEC_TO_CART'){
        const tempCart = state.cart.map((item)=>{
            if(item._id === action.payload){
                return {...item, qty: item.qty -1}
            }
            return item
        }).filter((item)=> item.qty !== 0)
        return{...state, cart: tempCart}
    }
    if(action.type === 'TOTAL_PRICE_CART'){
        let {total, amount} = state.cart.reduce((totalPrice,index)=>{
            let {qty, price} = index
            let tempPrice = qty * price;
            totalPrice.amount += qty
            totalPrice.total += tempPrice
            return totalPrice
        },{
            total: 0,
            amount: 0
        })
        return {...state, total, amount}
    }
    return state
}
export default Reducer;
