import DoctorCard from './DoctorCard';

const doctors = [
  {
    image: '/src/assets/images/image-12.png',
    name: 'Dr. Diana Prince',
    specialty: 'Primary Care Doctor',
    rating: 4.44,
    reviews: 671,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-6.png',
    name: 'Dr. Bruce Wayne',
    specialty: 'Cardiologist',
    rating: 4.25,
    reviews: 129,
    video: false,
    appointments: ['Fri Jul 26', 'Sat Jul 27', 'Sun Jul 28'],
  },
  {
    image: '/src/assets/images/image-11.png',
    name: 'Dr. Tony Stark',
    specialty: 'Primary Care Doctor',
    rating: 4.62,
    reviews: 422,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-3.png',
    name: 'Dr. Oliver Queen',
    specialty: 'Pediatrician',
    rating: 4.86,
    reviews: 194,
    video: true,
    appointments: ['Thu Jul 25', 'Fri Jul 26', 'Sat Jul 27'],
  },
  {
    image: '/src/assets/images/image-5.png',
    name: 'Dr. Steve Rogers',
    specialty: 'Orthopedic Surgeon',
    rating: 4.67,
    reviews: 72,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-10.png',
    name: 'Dr. Natasha Romanoff',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 320,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-7.png',
    name: 'Dr. Peter Parker',
    specialty: 'Cardiologist',
    rating: 4.8,
    reviews: 289,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-9.png',
    name: 'Dr. Carol Danvers',
    specialty: 'Pediatrician',
    rating: 4.7,
    reviews: 150,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-8.png',
    name: 'Dr. Stephen Strange',
    specialty: 'Neurologist',
    rating: 4.65,
    reviews: 210,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
  {
    image: '/src/assets/images/image-3.png',
    name: 'Dr. Bruce Banner',
    specialty: 'Orthopedic Surgeon',
    rating: 4.5,
    reviews: 190,
    video: true,
    appointments: ['Mon Jul 22', 'Tue Jul 23', 'Wed Jul 24'],
  },
];

const DoctorList = () => {
  return (
    <div className="mt-4">
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;