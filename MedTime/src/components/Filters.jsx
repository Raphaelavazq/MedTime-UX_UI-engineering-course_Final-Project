const Filters = () => {
    return (
      <div className="mt-4 space-y-2 overflow-x-auto">
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg border">I&apos;m flexible</button>
          <button className="p-2 rounded-lg border">Time of day</button>
          <button className="p-2 rounded-lg border">Illness</button>
          <button className="p-2 rounded-lg border">Specialty</button>
          <button className="p-2 rounded-lg border">Gender</button>
          <button className="p-2 rounded-lg border">In-person/video</button>
          <button className="p-2 rounded-lg border">More filters</button>
        </div>
      </div>
    );
  };
  
  export default Filters;