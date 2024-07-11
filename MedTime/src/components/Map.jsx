const Map = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="h-full">
      <iframe
        className="w-full h-full"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Berlin,DE`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;