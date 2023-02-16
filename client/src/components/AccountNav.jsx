import React from 'react'
import { UserIcon , ListBulletIcon , HomeModernIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'


const AccountNav = () => {

    const {pathname} = useLocation()
    const paths = pathname.split('/')
    const subpage = paths[paths.length - 1]

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
  )
}

export default AccountNav
