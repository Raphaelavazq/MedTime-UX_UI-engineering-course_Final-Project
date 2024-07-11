import BookSearch from '../components/BookSearch';
import Filters from '../components/Filters';
import DoctorList from '../components/DoctorList';
import Map from '../components/Map';

const BookDoctorPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 p-4 lg:p-8">
        <BookSearch />
        <Filters />
        <DoctorList />
      </div>
      <div className="lg:w-1/2 h-96 lg:h-auto">
        <Map />
      </div>
    </div>
  );
};

export default BookDoctorPage;