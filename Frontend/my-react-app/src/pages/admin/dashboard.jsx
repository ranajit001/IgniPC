import {useNavigate}from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';



export const Dashboard = ()=>{
        const navigate = useNavigate();

        const{auth} = useAuth();
        

    const checkAuth=()=>{
        if(!auth ||  !auth.user || !auth.user.role=='admin') {
            alert('you are not admin')
        }
        navigate('/admin/add-product')
    }


    return(<div>
        <button onClick={()=>checkAuth()}>add product</button>
    </div>)
}