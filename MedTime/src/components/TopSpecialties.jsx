const specialties = [
  { name: 'Primary Care', icon: '/src/assets/images/primary-care.svg' },
  { name: 'Dentist', icon: '/src/assets/images/dentist.svg' },
  { name: 'OB-GYN', icon: '/src/assets/images/ob-gyn.svg' },
  { name: 'Dermatologist', icon: '/src/assets/images/dermatologist.svg' },
  { name: 'Psychiatrist', icon: '/src/assets/images/psychiatrist.svg' },
  { name: 'Eye Doctor', icon: '/src/assets/images/eye.svg' },
];

const TopSpecialties = () => {
  return (
    <div className="bg-white p-6 md:p-12 lg:p-20">
      <h2 className="text-5xl mb-6 font-semibold text-blue-600 fontFamily: 'Fjalla One, sans-serif', color: 'white' text-center">Top-searched specialties</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {specialties.map((specialty, index) => (
          <div
            key={index}
            className=""
          >
            <div className="flex justify-center items-center bg-blue-600 rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto">
              <img src={specialty.icon} alt={specialty.name} className="h-10 md:h-14 lg:h-16" />
            </div>
            <p className="mt-2 text-2xl text-blue-500 font-semibold text-center">{specialty.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSpecialties;