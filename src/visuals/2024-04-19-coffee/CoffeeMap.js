import React from "react";
import { coffeeData } from "./coffeeData";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { faStarHalf as solidStarHalf } from '@fortawesome/free-solid-svg-icons'

import './CoffeeMap.css';


function GradientBar() {
  return (
    <div style={{ borderRadius: '20px', height: '20px', background: 'linear-gradient(to right, rgba(121, 64, 6, 0.25), rgba(121, 64, 6, 0.9))', margin: '10px 0' }}></div>
  );
}

function GradientLegend() {
  return (
    <div className="sidebar-gradient-legend">
      <p className="pLevels" style={{ margin: 0 }}> Price level:</p >
      <GradientBar />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className="pLevels" style={{ margin: 0 }}>Less expensive</p>
        <p className="pLevels" style={{ margin: 0 }}>More expensive</p>
      </div>
    </div >
  );
}

// const latitudes = coffeeData.info.map(shop => shop.center[0]);
// const longitudes = coffeeData.info.map(shop => shop.center[1]);

// const averageLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
// const averageLongitude = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;
const averageLatitude = 37.87;
const averageLongitude = -122.2625;

// let minPrice = Infinity;
let minPrice = 3.31; // micro yali's
// let maxPrice = -Infinity;
let maxPrice = 5.80; // blue bottle average

function CoffeeMap() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [isMobile, setIsMobile] = useState(null);
  const [defaultZoom, setDefaultZoom] = useState(null);

  const sortedShops = [...coffeeData.info].sort((a, b) => b.stars - a.stars);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      console.log('mobile');
      setIsMobile(true);
      setDefaultZoom(14);
    }
    else {
      console.log('not mobile');
      setIsMobile(false);
      setDefaultZoom(15);
    }
  }, []);

  // star icon for rating
  function StarRating({ rating }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FontAwesomeIcon className={isMobile ? "fa-2xs" : ""} icon={solidStar} key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <div className="half-star-icon" key={i}>
            <FontAwesomeIcon className={`star-icon ${isMobile ? "fa-2xs" : ""}`} icon={regularStar} />
            <FontAwesomeIcon className={`star-icon ${isMobile ? "fa-2xs half-star" : "half-star"}`} icon={solidStarHalf} />
          </div>
        );
      } else {
        stars.push(<FontAwesomeIcon className={isMobile ? "fa-2xs" : ""} icon={regularStar} key={i} />);
      }
    }

    return (
      <div className="stars-container">{stars}</div>
    );
  }

  // resets map zoom and center
  const ResetZoomButton = () => {
    const map = useMap();

    const resetZoom = () => {
      if (map && averageLatitude != null && averageLongitude != null) {
        map.setView([averageLatitude, averageLongitude], defaultZoom);
      }
      setSelectedShop(null);
    };

    return (
      <button onClick={resetZoom} className="reset-button">
        Reset map
      </button>
    );
  };

  // controls zooming to coffee shop
  const MapController = ({ selectedShop }) => {
    const map = useMap();
    const flyToDuration = 1.5;

    useEffect(() => {
      if (selectedShop && map) {
        let location;
        // offset coffee shop centered point to fit tooltip on mobile
        if (isMobile) {
          location = [selectedShop.center[0], selectedShop.center[1] - 0.0005];
        }
        else {
          location = [selectedShop.center[0], selectedShop.center[1]];
        }
        map.flyTo(location, 18, {
          animate: true,
          duration: flyToDuration,
        });
      }
    }, [selectedShop, map]);

    return null;
  };

  return (
    <div
      className="coffee-map-container">
      <div className="sidebar coffee-flex-item">
        <div className="sidebar-gradient-legend-container">
          <GradientLegend />
        </div>
        <div className="sidebar-card-container">
          {sortedShops.map((shop, index) => (
            <div key={index} className="sidebar-card" onClick={() => {
              setSelectedShop(shop)
            }}>
              <p className="shop-name">{shop.shopName}</p>
              <StarRating rating={shop.stars} />
              <p className="coffee-address">{shop.address}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="map-container coffee-flex-item">
        {defaultZoom ? <MapContainer
          className="map"
          // center={[37.8686181, -122.2611693]}
          center={[averageLatitude, averageLongitude]}
          zoom={defaultZoom}>
          <MapController selectedShop={selectedShop} />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png" />
          {coffeeData.info.map((shop, index) => {
            const minOpacity = 0.15;
            const maxOpacity = 0.9;
            const t = (shop.averagePrice - minPrice) / (maxPrice - minPrice);
            const opacity = minOpacity + t * (maxOpacity - minOpacity);
            // console.log(shop, t, opacity);
            return (
              <CircleMarker
                key={index}
                center={[shop.center[0], shop.center[1]]}
                radius={8}
                weight={2}
                fill
                eventHandlers={{
                  click: () => {
                    setSelectedShop(shop)
                  }
                }}
                color="#000"
                opacity={opacity}
                fillColor={"#7e453a"}
                fillOpacity={opacity}
              // pathOptions={{
              //   color: '#000',
              //   fillColor: '#7e453a',
              //   fillOpacity: opacity
              // }}
              >
                <Tooltip className="customTooltip">{shop.shopName}</Tooltip>
                {selectedShop === shop && (
                  <Tooltip className="customTooltip" permanent>
                    <h3 className="shopName">{shop.shopName}</h3>
                    {console.log("selected shop: " + selectedShop.shopName)}
                    {shop.dripPrice !== null && <li>Drip: ${shop.dripPrice.toFixed(2)}</li>}
                    {shop.mochaPrice !== null && <li>Mocha: ${shop.mochaPrice.toFixed(2)}</li>}
                    {shop.lattePrice !== null && <li>Latte: ${shop.lattePrice.toFixed(2)}</li>}
                    {shop.espressoPrice !== null && <li>Espresso: ${shop.espressoPrice.toFixed(2)}</li>}
                    {shop.americanPrice !== null && <li>Americano: ${shop.americanPrice.toFixed(2)}</li>}
                    {shop.capPrice !== null && <li>Cappuccino: ${shop.capPrice.toFixed(2)}</li>}
                    {shop.averagePrice !== null && <li><b>Average: ${shop.averagePrice.toFixed(2)}</b></li>}
                  </Tooltip>
                )}
              </CircleMarker>
            );
          })}
          <ResetZoomButton />
        </MapContainer> : <></>}
      </div>
    </div>
  );
}


export default CoffeeMap;