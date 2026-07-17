import React from 'react'
import './MapCard.css'


const MapCard = ({filteredMaps = []}) => {

  return (
    <div className='card_container'>
        {filteredMaps.map((item, index) => (
            <div key={item.id || index} className='card'>
                <img className='card_img' src={item.image} alt="map" />
                <h3 className='card_title'>{item.name}</h3>
            </div>
        ))} 
    </div>
  )
}

export default MapCard