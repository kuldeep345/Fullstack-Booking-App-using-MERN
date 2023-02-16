import React from 'react'

const PlaceImg = ({ place, index = 0, className = null }) => {

    if (!place.photos?.length) {
        return '';
    }

      if (!className) {
        className = 'object-cover'
    }

    return (
        <>
            <img className={className} src={`${process.env.REACT_APP_BASE_URL}/uploads/${place?.photos[0]}`} alt="" />
        </>
    )
}

export default PlaceImg
