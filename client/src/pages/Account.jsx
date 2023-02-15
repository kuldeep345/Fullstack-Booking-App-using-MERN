import {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import { UserIcon , ListBulletIcon , HomeModernIcon } from '@heroicons/react/24/outline'

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

    function linkClasses(type=null){
        let classes = 'inline-flex gap-1 p-2 px-6 rounded-full '
        if(type === subpage ){
            classes += 'bg-primary text-white '
        }
        else{
            classes += 'bg-gray-200'
        }
        return classes
    }

  return (
    <div>
        <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
            <Link className={linkClasses('account')} to={'/account'}>
                <UserIcon className='h-5 m-auto'/>
                My profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <ListBulletIcon className='h-6 m-auto'/>
                My Bookings
                </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <HomeModernIcon className='h-6 m-auto'/>
                My accomodations
            </Link>
        </nav>
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
