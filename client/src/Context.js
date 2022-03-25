import React, { useReducer, useContext, useEffect} from 'react'
import Reducer from './Reducer.js' 
const  AppContext = React.createContext()
const initialState = {
    cart: [],
    user: [],
    isLogin: false,
    isAdmin: false,
    showNavbar: true,
    total: 0,
    amount: 0,
}
export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    

    const getCart = (item, qty=1)=>dispatch({type: 'ADD_TO_CART', payload: {item, qty}})
    const getShowNavBar = (type='show')=>{
        if(type === 'show'){
            dispatch({type:'SHOW_NAV_BAR'})
        }
        if(type === 'hide'){
            dispatch({type:'HIDE_NAV_BAR'})
        }
    }
    const getUserLogin = (isLogin, isAdmin, user)=>dispatch({type: 'GET_USER_API_SUCCESS', payload: {isLogin, isAdmin, user}})
    const increseQty =(id)=> dispatch({type: 'INC_TO_CART', payload: id})
    const decreseQty =(id)=> dispatch({type: 'DEC_TO_CART', payload: id})
    useEffect(()=>{
        dispatch({type:'TOTAL_PRICE_CART'})
    },[state.cart])
  return (<AppContext.Provider 
  value={{...state, getCart, getShowNavBar, getUserLogin, increseQty, decreseQty}}
  >
      {children}
  </AppContext.Provider>)
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

