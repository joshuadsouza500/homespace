import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

{
  /**
    
setMaxBounds:Sets the max bounds of the map, restricting the area within which the map can pan.   
*/
}

const LocationMaker = ({ city, image, address, price }) => {
  const map = useMap();
  const [position, setPosition] = useState([26.0667, 50.5577]);
  const bahrainBounds = [
    [25.534, 50.28], // Southwest corner
    [26.32, 50.85], // Northeast corner
  ];
  useEffect(() => {
    map.setMaxBounds(bahrainBounds);

    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city + ", Bahrain"
        )}&format=json&accept-language=en&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0]; // Take the first result

        setPosition([lat, lon]);
        map.flyTo([lat, lon], 13); // Set the map view
      } else {
        // console.error("city not found.");
      }
    };

    fetchCoordinates();
  }, [city, map]);

  return position ? (
    <Marker position={position}>
      <Popup className="p-2 rounded-lg" closeOnClick={true}>
        <div className="bg-white flex flex-col w-[100px] rounded-md overflow-hidden shadow-md">
          <img src={image} alt={address} className="w-full h-12 object-cover" />
          <div className="pt-1 pb-2 px-1 space-y-[2px] flex flex-col items-start">
            <span className="line-clamp-1 text-xs font-semibold text-text">
              {city ? city : null},{address}
            </span>
            <span className="text-sm font-medium text-Primary">
              {price} BHD
            </span>
            {/**   <button className="mt-1 text-[8px]  hover:text-blue-600 transition duration-200">
              View Property
            </button>**/}
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export default LocationMaker;
