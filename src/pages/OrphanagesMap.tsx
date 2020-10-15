import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import imgMapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}


function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  const mapboxToken = String(process.env.REACT_APP_MAPBOX_TOKEN).replace(';', '');

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={imgMapMarker} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Campina Grande</strong>
          <span>Paraíba</span>
        </footer>
      </aside>

      <Map
        center={[-7.2427512,-35.9365838]}
        zoom={15}
        style={{width: '100%', height: '100%'}}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
        />

        {(orphanages && orphanages.map((orphanage: Orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF"/>
                </Link>
              </Popup>
            </Marker>
          )
        }))}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size="32" color="#FFF"/>
      </Link>

    </div>
  )
}

export default OrphanagesMap;