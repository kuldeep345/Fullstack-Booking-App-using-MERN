import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import PlaceImg from '../components/PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { CalendarDaysIcon , MoonIcon , CreditCardIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import BookingDates from '../components/BookingDates'

const BookingsPage = () => {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('/user/bookings').then((res)=>{
      setBookings(res.data)
    })
  }, [])

  console.log(bookings)
  
  return (
    <div>
      <AccountNav/>
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-3'>
            <div className='w-48'>
              <PlaceImg place={booking.place}/>
            </div>
            <div className='py-1 pr-3 grow'>
            <h2 className="text-lg font-semibold ">{booking.place.title}</h2>
          
            <div className="text-[17px] font-semibold">
            <BookingDates booking={booking}/>
              <div className='flex gap-2'>
              <CreditCardIcon className='h-6'/> 
             Total price:  ${booking.place.price * differenceInCalendarDays(new Date(booking.checkOut) , new Date(booking.checkIn))}
              </div>
            </div>
           </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
