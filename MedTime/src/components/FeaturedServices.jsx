const FeaturedServices = () => {
  return (
    <div className="bg-yellow-500 p-10 md:p-20">
      <h2 className="text-2xl font-semibold text-center pb-40 text-white">Let&apos;s get you a doc who gets you</h2>
      <div className="flex flex-col md:flex-row mt-8 space-y-20 md:space-y-0 md:space-x-4">
        <div className="bg-white p-4 pt-20 rounded shadow w-full md:w-1/3 text-center relative">
          <img
            src="https://d1uhlocgth3qyq.cloudfront.net/ValuePropsInsurance___5f19a.svg"
            alt="Browse providers"
            className="h-44 w-44 mx-auto absolute -top-20 inset-x-0"
          />
          <p className="mt-10 mb-2 text-gray-800 text-center">Browse providers </p>
          <button className="py-2 px-4 bg-yellow-500 text-white rounded-full shadow-md hover:bg-orange-500 transition-colors mx-auto block justify-end">See specialties</button>
        </div>
        <div className="bg-white p-4 pt-20 rounded shadow w-full md:w-1/3 text-center relative">
          <img
            src="https://d1uhlocgth3qyq.cloudfront.net/ValuePropsReviews___d6977.svg"
            alt="Read reviews"
            className="h-44 w-44 mx-auto absolute -top-20 inset-x-0"
          />
          <p className="mt-10 mb-2 text-gray-800 text-center">Read reviews from users</p>
          <button className="py-2 px-4 bg-yellow-500 text-white rounded-full shadow-md hover:bg-orange-500 transition-colors mx-auto block justify-end">See providers</button>
        </div>
        <div className="bg-white p-4 pt-20 rounded shadow w-full md:w-1/3 text-center relative">
          <img
            src="https://d1uhlocgth3qyq.cloudfront.net/ValuePropsBook___893a8.svg"
            alt="Book an appointment"
            className="h-44 w-44 mx-auto absolute -top-20 inset-x-0"
          />
          <p className="mt-10 mb-2 text-gray-800 text-center">Book an appointment </p>
          <button className="py-2 px-4 bg-yellow-500 text-white rounded-full shadow-md hover:bg-orange-500 transition-colors mx-auto block justify-end">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;