import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../Context"
const PrivateAdmin = ({children})=>{
    const {userApi} = useGlobalContext()
    const navigate = useNavigate()
    console.log(userApi.isAdmin)
    return userApi.isAdmin ? children : navigate('/')
}
export default PrivateAdmin;