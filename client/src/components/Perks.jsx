import React from 'react'
import { CloudArrowUpIcon, WifiIcon, TruckIcon, TvIcon, FaceSmileIcon, ArrowLeftOnRectangleIcon, RadioIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'

const Perks = ({selected , onChange}) => {
  return (
 <>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <WifiIcon className='h-5' />
        <span>Wifi</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <TruckIcon className='h-5' />
        <span>Free parking spot</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <TvIcon className='h-5' />
        <span>TV</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <RadioIcon className='h-5' />
        <span>Radio</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <HandThumbUpIcon className='h-5' />
        <span>Pets</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" />
        <ArrowLeftOnRectangleIcon className='h-5' />
        <span>Private entrance</span>
    </label>
</>
  )
}

export default Perks
