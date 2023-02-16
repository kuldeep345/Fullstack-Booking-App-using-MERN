import React from 'react'
import { CalendarDaysIcon , MoonIcon } from '@heroicons/react/24/outline'
import { differenceInCalendarDays, format } from 'date-fns'

const BookingDates = ({booking }) => {
  return (
    <div className="flex gap-1 items-center border-t text-gray-500 py-1">
    <MoonIcon className="h-4 text-sm"/>
    {differenceInCalendarDays(new Date(booking.checkOut) , new Date(booking.checkIn))} nights :
    <div className='flex gap-2 items-center'>
    <div className='flex gap-1 items-center text-sm'>
    <CalendarDaysIcon className="h-5"/>
      {format(new Date(booking.checkIn) , 'yyyy-MM-dd')} 
    </div>
      &rarr; 
      <div className='flex gap-1 items-center text-sm'>
    <CalendarDaysIcon className="h-5"/>
      {format(new Date(booking.checkIn) , 'yyyy-MM-dd')}
      </div>
  </div>
    </div>
  )
}

export default BookingDates
