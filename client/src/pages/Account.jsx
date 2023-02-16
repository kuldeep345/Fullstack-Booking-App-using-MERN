import {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav'

const Account = () => {
    const {ready , user , setUser } = useContext(UserContext)
    const {pathname} = useLocation()
    const paths = pathname.split('/')
    const subpage = paths[paths.length - 1]
    const navigate = useNavigate()


    async function logout(){
        await axios.post('/user/logout')
        setUser(null)
        navigate("/")
    }
   
    if(ready && !user){
        return <Navigate to={'/login'} />
    }

 

  return (
    <div>
        <AccountNav/>
        {subpage === 'account' && (
            <div className='text-center max-w-lg mx-auto'>
                Logged in as {user?.name} ({user?.email}) <br/>
                <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
            </div>
        )}
        {subpage === 'places' && (
            <PlacesPage />
        )}
    </div>
  ) 
}

export default Account
