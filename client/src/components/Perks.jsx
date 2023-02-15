import React from 'react'
import { WifiIcon, TruckIcon, TvIcon, ArrowLeftOnRectangleIcon, RadioIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'

const Perks = ({selected , onChange}) => {
   
    const handleCbClick = async(e)=>{
        const { checked , name } = e.target

        if(checked){
            onChange([...selected , name])
        }
        else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }

  return (
 <>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onChange={handleCbClick} />
        <WifiIcon className='h-5' />
        <span>Wifi</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" checked={selected.includes("parking")} name="parking" onChange={handleCbClick} />
        <TruckIcon className='h-5' />
        <span>Free parking spot</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" name="tv" checked={selected.includes("tv")} onChange={handleCbClick} />
        <TvIcon className='h-5' />
        <span>TV</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" name="radio" checked={selected.includes("radio")} onChange={handleCbClick} />
        <RadioIcon className='h-5' />
        <span>Radio</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" name="pets" checked={selected.includes("pets")} onChange={handleCbClick} />
        <HandThumbUpIcon className='h-5' />
        <span>Pets</span>
    </label>
    <label className='border p-4 flex rounded-2xl gap-2 items-center'>
        <input type="checkbox" name="private" checked={selected.includes("private")} onChange={handleCbClick} />
        <ArrowLeftOnRectangleIcon className='h-5' />
        <span>Private entrance</span>
    </label>
</>
  )
}

export default Perks
