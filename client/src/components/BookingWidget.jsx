import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../context/UserContext'

const BookingWidget = ({place}) => {

    const [checkIn , setChecIn] = useState()
    const [checkOut , setCheckOut] = useState()
    const [numberOfGuests , setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    useEffect(() => {
      if(user){
        setName(user.name)
      }
    }, [user])
    

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = Math.abs(differenceInCalendarDays(new Date(checkIn) , new Date(checkOut)))
    }

    async function bookThisPlace(){
      const booking = {
        place:place._id,
         checkIn, 
         checkOut,
         numberOfGuests,
         name,
         phone:mobile,
         price:numberOfNights * place.price
        }
       const { data } = await axios.post("/user/booking" , booking)
       const bookingId = data._id
       navigate(`/account/bookings/${bookingId}`)
    }

  return (
    <div className='bg-white p-4 rounded-2xl'>
    <h2 className='text-2xl text-center'>
      Price: ${place.price} / per night
    </h2>
    <div className='border rounded-2xl mt-4'>
      <div className='flex'>
        <div className='py-3 px-4'>
          <label>Check in:</label>
          <input type="date" value={checkIn} onChange={e=>setChecIn(e.target.value)}/>
        </div>
      <div className='py-3 px-4 border-l'>
        <label>Check out:</label>
        <input type="date" value={checkOut}  onChange={e=>setCheckOut(e.target.value)}/>
      </div>
    </div>
    <div className='py-3 px-4 border-t'>
      <label>Number of guests</label>
      <input type="number" value={numberOfGuests} onChange={e=>setNumberOfGuests(e.target.value)}/>
    </div>
    {numberOfNights > 0 && (
        <div className='py-3 px-4 border-t'>
        <label>Your full Name:</label>
       <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

       <label>Phone number:</label>
       <input type="tel" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
        </div>
        
    )}
    </div>
    <button onClick={bookThisPlace} className='primary mt-4'>
        Book this place
        {numberOfNights > 0 && (
            <span> ${numberOfNights * place.price}</span>
        )}
    </button>
  </div>
  )
}

export default BookingWidget
