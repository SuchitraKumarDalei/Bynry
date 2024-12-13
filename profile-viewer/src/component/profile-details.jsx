import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProfileDetails() {
  const location = useLocation();
  const profile = location.state;

  const [cords, setCords] = useState(null);

  const fetchCords = async () => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      profile.address
    )}&key=AIzaSyCQx4pA29uU8cUJn2-B_xHK6sLedkdouHA`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setCords(location);
      } else {
        console.error("Geocoding error:", data.status);
      }
    } catch (error) {
      console.error("Failed to fetch geocoding data:", error);
    }
  };

  useEffect(() => {
    fetchCords();
  }, [profile.address]);

  useEffect(() => {
    const initializeMap = () => {
      if (!cords) return;

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: cords,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: cords,
        map: map,
      });
    };

    const loadGoogleMapsScript = () => {
      if (document.getElementById("google-maps-script")) return;

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCQx4pA29uU8cUJn2-B_xHK6sLedkdouHA`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, [cords]);

  return (
    <div className="grid  grid-rows-2 gap-4 m-h-[85vh] p-3 border-2 rounded-md m-4">
      <div className=" grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-3 border-b-2 ">
        <div className="h-[200px] w-[200px] flex flex-col justify-center">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-full w-full object-cover rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-6 ">
          <p className="text-2xl font-semibold">Name: {profile.name}</p>
          <p className="text-lg font-serif">Role: {profile.role}</p>
          <p className="text-lg font-serif">Address: {profile.address}</p>
          <p className="text-lg font-serif">Description: {profile.description}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-b-2 pb-2">Find him/her on the map</div>
        <div className="border-2 rounded-md my-2" id="map" style={{ height: "400px" }}>
          {!cords && <p>Loading map...</p>}
        </div>
      </div>
    </div>
  );
}