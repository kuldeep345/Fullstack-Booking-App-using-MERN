import React, { useState } from 'react'
import axios from 'axios'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'


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

    return (
        <>
            <div className='flex gap-2'>
                <input type="text" name="photoLink" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder={'Add using a link .....jpg'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 my-1.5 rounded-2xl'>Add&nbsp;photo</button>
            </div>

            <div className='cursor-pointer grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos?.length > 0 && addedPhotos?.map(link => (
                    <div key={link} className='h-32 flex'>
                        <img className='rounded-2xl w-full object-cover object-center' src={`http://localhost:4000/uploads/${link}`} />
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
