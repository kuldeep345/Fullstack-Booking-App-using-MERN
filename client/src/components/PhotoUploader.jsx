import React, { useState } from 'react'
import axios from 'axios'
import { CloudArrowUpIcon , TrashIcon , StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStar } from '@heroicons/react/24/solid'


const PhotoUploader = ({addedPhotos,setAddedPhotos , photo , setPhoto }) => {

    async function addPhotoByLink(e){
        e.preventDefault()
        const { data:filename } = await axios.post('/user/upload-by-link' , {link:photo})
        setAddedPhotos(prev => {
          return [...prev , filename]
        })
    }

    async function uploadPhoto(e){
      if(e.target.files.length === 0){
          return 
      }
      const files = e.target.files
      const data = new FormData();
      for(let i=0; i<files.length; i++){
          data.append('photos' , files[i])
      }
        axios.post('/user/upload' , data , {
              headers:{
                  'Content-Type':'multipart/form-data'
              }
          }).then((response) => {
              const { data:filename } = response;
              const arr = [...addedPhotos]
              filename.map((item,i)=>{
                  arr.push(item)
              })
              setAddedPhotos(arr)
          })
    }

    const removePhoto = async(link)=>{
        setAddedPhotos([...addedPhotos.filter(photo => photo !== link)])
    }

    const selectAsMainPhoto = async(link)=>{
        setAddedPhotos([link , ...addedPhotos.filter(photo => photo !== link)])
    }

    return (
        <>
            <div className='flex gap-2'>
                <input type="text" name="photoLink" onChange={(e) => setPhoto(e.target.value)} placeholder={'Add using a link .....jpg'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 my-1.5 rounded-2xl'>Add&nbsp;photo</button>
            </div>

            <div className='cursor-pointer grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos?.length > 0 && addedPhotos?.map(link => (
                    <div key={link} className='h-32 flex relative'>
                        <img className='rounded-2xl w-full object-cover object-center' src={`http://localhost:4000/uploads/${link}`} />
                        <div className='absolute text-white bottom-1 right-1 bg-black bg-opacity-50 rounded-xl py-2 px-3'>
                            <TrashIcon onClick={()=>removePhoto(link)} className='h-6'/>
                        </div>
                        <div className='absolute text-white bottom-1 left-1 bg-black bg-opacity-50 rounded-xl py-2 px-3'>
                            {link === addedPhotos[0] && (
                                <SolidStar className='h-6 text-white'/>
                            )}
                            {link !== addedPhotos[0] && (
                                <StarIcon onClick={()=>selectAsMainPhoto(link)} className='h-6 text-white'/>
                            )}
                      
                        </div>
                    </div>
                ))}

                <label className='h-32 flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                    <input multiple type="file" className='hidden' onChange={uploadPhoto} />
                    <CloudArrowUpIcon className='h-6 my-auto' />
                    Upload
                </label>

            </div>
        </>
    )
}

export default PhotoUploader
