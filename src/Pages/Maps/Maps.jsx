import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import MapCard from "../../Components/MapCard/MapCard";
import maps_data from "../../Assets/Maps/Maps_data";
import "./Maps.css";

const Maps = () => {

const [filterType, setFilterType] = useState('all')
const initialMaps = maps_data
const filteredMaps =filterType === 'all'
? initialMaps
: initialMaps.filter(item => item.type === filterType);

  return (
    <div>
      <Navbar />
      <div className="maps-container">
        <h1>Maps</h1>
        <p className="maps_info">
          These maps were all used in my family's Humblewood campaign with more
          maps getting added as the campaign progresses and maps from other
          campaigns will be added when new campaigns are started.
        </p>
        <div className="btn_row">
            <button className="btn" onClick={() => setFilterType('all')}>All</button>
            <button className="btn" onClick={() => setFilterType('buildings')}>Buildings</button>
            <button className="btn" onClick={() => setFilterType('city')}>City</button>
            <button className="btn" onClick={() => setFilterType('generic')}>Generic</button>
        </div>
        <div className="mapCard--container">
          <MapCard key={filterType} filteredMaps={filteredMaps} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Maps;
