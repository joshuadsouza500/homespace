import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
{
  /**
    
setMaxBounds:Sets the max bounds of the map, restricting the area within which the map can pan.   
*/
}

{
  /**
  
  useEffect(() => {
    if (!city) return;

    // Geocode the provided city name
    ELG.geocode()
      .text(city)
      .run((err, results, response) => {
        if (err) {
          console.error("Geocoding error:", err);
          return;
        }

        // Check if results are available
        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;

          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        } else {
          console.warn("No results found for the specified city.");
        }
      });
  }, [city, map]);*/
}

const LocationMaker = ({ city }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city + ", Bahrain"
        )}&format=json&accept-language=en`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0]; // Take the first result
        console.log("lat and long", lat, lon);
        setPosition([lat, lon]);
        map.flyTo([lat, lon], 13); // Set the map view
      } else {
        console.error("city not found.");
      }
    };

    fetchCoordinates();
  }, [city, map]);

  return position ? (
    <Marker position={position}>
      <Popup>{city}</Popup>
    </Marker>
  ) : null;
};

export default LocationMaker;
