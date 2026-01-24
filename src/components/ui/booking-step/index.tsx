import { Card } from "primereact/card";

const BookingSteps = () => {
  const steps = [
    {
      number: "01",
      icon: "pi-map-marker",
      title: "Choose Destination",
      description:
        "All you have to do is, first select your preferred destination and proceed",
    },
    {
      number: "02",
      icon: "pi-credit-card",
      title: "Make Payment",
      description:
        "You are important to us. We pay attention to the quality of every service we provide to you.",
    },
    {
      number: "03",
      icon: "pi-briefcase",
      title: "Ready For Travelling",
      description:
        "We have seen that you have fulfilled all the requirements, now you are ready to travel.",
    },
  ];

  return (
    <div className="min-h-screen  p-8">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-teal-700">Easy Steps </span>
          <span className="text-orange-400">For Bookings</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Destinations worth exploring! Here are a few popular spots
        </p>
      </div>

      {/* Steps Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 backdrop-blur rounded-tr-lg"
          >
            <div className="p-6">
              {/* Number and Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="bg-teal-700 text-white rounded-2xl w-20 h-20 flex items-center justify-center">
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
                <div className="border-4 border-orange-400 rounded-full w-20 h-20 flex items-center justify-center">
                  <i className={`pi ${step.icon} text-3xl text-teal-700`}></i>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-teal-700 mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Support Button */}
      <div className="fixed bottom-8 left-8">
        <button className="bg-linear-to-r from-cyan-400 to-teal-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <i className="pi pi-headphones text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default BookingSteps;
