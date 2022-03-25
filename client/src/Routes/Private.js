import {useNavigate} from 'react-router-dom' 
const Private = ({children})=>{
    const navigate = useNavigate()
    let auth = localStorage.getItem('authToken');
    return auth? children: navigate('/login')
}

export default Private