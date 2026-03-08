import LabelTag from "@/components/ui/LabelTag";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

export default function ServiceDetailScreen() {
  const [filter, setFilter] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Search submitted:", filter);
  };

  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const galleryImages = [
      {
        itemImageSrc:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        alt: "Tour Guide 1",
      },
      {
        itemImageSrc:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        alt: "Tour Guide 2",
      },
      {
        itemImageSrc:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
        alt: "Tour Guide 3",
      },
      {
        itemImageSrc:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        alt: "Tour Guide 4",
      },
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImages(galleryImages);
  }, []);

  // const recentPosts = [
  //   {
  //     date: "14",
  //     month: "June",
  //     author: "Aidan Butler",
  //     title: "Resources for your first trip to overseas vacation",
  //   },
  //   {
  //     date: "20",
  //     month: "June",
  //     author: "Ricardo Bell",
  //     title: "How to get acquainted with natives in a strange land",
  //   },
  //   {
  //     date: "24",
  //     month: "June",
  //     author: "Martin Hicks",
  //     title: "Step by step guide to planning your ideal holiday",
  //   },
  // ];

  const destinations = [
    { name: "Thailand", listings: "( 05 Listing )" },
    { name: "Maldives", listings: "( 07 Listing )" },
    { name: "Bangkok", listings: "( 08 Listing )" },
    { name: "Thailand", listings: "( 05 Listing )" },
    { name: "Maldives", listings: "( 07 Listing )" },
    { name: "Bangkok", listings: "( 08 Listing )" },
    { name: "Paris", listings: "( 04 Listing )" },
    { name: "Spain", listings: "( 02 Listing )" },
  ];

  const gallery = [
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
    },
  ];

  const itemTemplate = (item: any) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
        className="h-96 object-cover rounded-3xl"
      />
    );
  };

  const popularTags = [
    "Food",
    "Bag",
    "Pool",
    "Buffet",
    "city view",
    "Beach",
    "Adventure",
    "Travel",
    "Bakery",
    "Wildlife",
  ];

  const tourTypes = [
    {
      title: "Private Guide",
      description:
        "One-on-one personalized tours; often tailored to specific interests",
    },
    {
      title: "Private Guide",
      description:
        "One-on-one personalized tours; often tailored to specific interests",
    },
    {
      title: "Group Tours",
      description:
        "Travel together with multiple travelers; often more budget-friendly",
    },
    {
      title: "City Guides",
      description:
        "Local experts for urban exploration—museums, markets, monuments",
    },
    {
      title: "Cultural Guides",
      description:
        "Focus on traditions, festivals, cuisine, and heritage sites",
    },
    {
      title: "Tour Managers",
      description:
        "Oversee multi-day trips; handling logistics and group coordination",
    },
    {
      title: "Nature & Wildlife",
      description:
        "Specialists in safaris, trekking, and eco-tourism areas like sanctuaries",
    },
  ];

  const faqs = [
    { question: "01 - How can I book a trip?" },
    { question: "02 - What is your cancellation policy?" },
    { question: "03 - Do you offer international travel packages?" },
    { question: "04 - Are there group discounts available?" },
  ];

  const amenities = [
    {
      title: "Hotel",
      description:
        "Free Wi-Fi, in-room tea, heated floors, in-room slippers, cable TV, room service",
    },
    {
      title: "Restaurants",
      description:
        "Fine water, 5-star dishes, cat facilities, Wi-Fi, media, snacking",
    },
    {
      title: "Public Facilities",
      description:
        "Clean restrooms, free Wi-Fi (Good), tourist information centers, lockers",
    },
    {
      title: "Transportation",
      description:
        "Buses, trains, ATM, taxis, E-trolley has (per/trip), cab, mobile apps",
    },
    {
      title: "Shopping Area",
      description:
        "Tax refund counters, delivery services, foreign language staff (in major metros)",
    },
    {
      title: "Breakfast",
      description:
        "Korean breakfasts often include soups, rice, and side dishes. Western breakfast options available",
    },
    {
      title: "Friendly Cafés",
      description:
        "Many offer English menus, desserts, foreign snacks, and unique drinks",
    },
    {
      title: "Delivery Apps",
      description:
        "Baedal Minjok, Yogiyo offer English support and deliver almost anywhere",
    },
    {
      title: "Visa/ Naming",
      description:
        "Growing availability, especially in hotels; some apps help locate vegan food",
    },
    {
      title: "Free Side-Dishes",
      description:
        "Most Korean restaurants offer unlimited free side dishes with meals",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image with Galleria */}
            <div className="mb-8 relative rounded-3xl overflow-hidden shadow-lg">
              <Galleria
                value={images}
                showThumbnails={false}
                showIndicators
                item={itemTemplate}
                autoPlay
                circular
                transitionInterval={3000}
                className="rounded-3xl"
              />
            </div>

            {/* Title & Description */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-teal-700 mb-4">
                Tour guide who give you proper information about every
                destination
              </h1>
              <p className="text-gray-600 leading-relaxed">
                A tour guide service connects travelers with knowledgeable
                professionals who lead and inform travel experiences. Tour
                guides offer insights into the history, culture, and
                significance of locations they visit, ensuring a richer
                understanding of the places, landmarks, restaurants, museums,
                and attractions.
              </p>
            </div>

            {/* What is a Tour Guide Service */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                What Is a Tour Guide Service?
              </h2>
              <div className="space-y-3">
                {[
                  "Expert narration of history, culture, and natural significance of places",
                  "Assisting with logistical like hotel check-ins, local transport, and dining",
                  "Offering safety tips and local etiquette guidance",
                  "Customizing itineraries based on traveler interests",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-1 mt-1 shrink-0">
                      <i className="pi pi-check text-white text-xs"></i>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Types of Tour Guide Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-700 mb-6">
                Types of Tour Guide Services
              </h2>
              <div className="space-y-4">
                {tourTypes.map((type, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="text-teal-700 font-semibold text-lg mb-1">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                Key Features of Professional Tour Guides
              </h2>
              <div className="space-y-3">
                {[
                  "Certified by the Government of USEA: Licensed guides undergo rigorous training and exams",
                  "Multilingual: Many guides speak: English, Hindi, and regional languages",
                  "Flexible Engagement: You can choose full-time guidance or occasional support",
                  "Safety & Support: Guides help navigate unfamiliar areas and handle emergencies",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-1 mt-1 shrink-0">
                      <i className="pi pi-check text-white text-xs"></i>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-700 mb-6">
                Frequently Ask Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <span className="text-teal-700 font-medium">
                      {faq.question}
                    </span>
                    <i className="pi pi-angle-right text-gray-400"></i>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                Our Scheduled Amenities
              </h2>
              <h3 className="text-xl font-bold text-teal-700 mb-6 mt-8">
                Our Scheduled Amenities
              </h3>

              {/* For Travel Section */}
              <h4 className="text-lg font-semibold text-teal-700 mb-4 mt-6">
                For Travel
              </h4>
              <div className="space-y-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div className="col-span-1">
                      <h5 className="text-teal-700 font-semibold">
                        {amenity.title}
                      </h5>
                    </div>
                    <div className="col-span-3">
                      <p className="text-gray-600 text-sm">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search box */}
            <div className="flex-1 min-w-70 max-w-2xl">
              <div className="relative">
                <InputText
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full px-6 py-3 pr-24 rounded-full shadow-xl border-box focus:outline-none focus:ring-0 transition-all duration-300"
                  style={{
                    fontSize: "1.1rem",
                    height: "50px",
                    borderRadius: "9999px",
                    border: "5px solid #0f766e",
                    backgroundColor: "#fff7ed",
                    paddingLeft: "20px",
                    color: "#334155",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ffaa0d";
                    e.target.style.backgroundColor = "#0f766e";
                    e.target.style.color = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ffaa0d";
                    e.target.style.backgroundColor = "#fff7ed";
                    e.target.style.color = "#334155";
                  }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-700 hover:bg-teal-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-lg"
                  style={{
                    backgroundColor: "#ffaa0d",
                  }}
                >
                  <i className="pi pi-search text-white text-xs"></i>
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Bài viết gần đây</LabelTag>
              <Card className="mb-6 border-0 shadow-sm">
                <div className="space-y-6">
                  {[
                    {
                      date: "14",
                      month: "June",
                      author: "Aidan Butler",
                      title:
                        "Resources for your first trip to overseas vacation",
                    },
                    {
                      date: "20",
                      month: "June",
                      author: "Ricardo Bell",
                      title:
                        "How to get acquainted with natives in a strange land",
                    },
                    {
                      date: "24",
                      month: "June",
                      author: "Martin Hicks",
                      title:
                        "Step by step guide to planning your ideal holiday",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex gap-4">
                        <div className="bg-teal-700 rounded-lg px-3 py-2 flex flex-col items-center justify-center shrink-0 w-16 h-16">
                          <div className="text-white text-2xl font-bold leading-none">
                            {item.date}
                          </div>
                          <div className="text-white text-sm">{item.month}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-orange-500 font-semibold mb-2">
                            {item.author}
                          </h4>
                          <p className="text-teal-700 text-lg font-semibold leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      {index < 2 && (
                        <hr className="border-dashed border-gray-300 mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Top Destinations */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Điểm đến hàng đầu</LabelTag>
              <Card className="mb-6 border-0 shadow-sm">
                <div className="space-y-6">
                  {destinations.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center gap-4">
                        <h4 className="text-orange-500 font-semibold mb-2">
                          {item.name}
                        </h4>
                        <p className="text-teal-700 text-lg font-semibold leading-snug">
                          {item.listings}
                        </p>
                      </div>
                      {index < destinations.length - 1 && (
                        <hr className="border-dashed border-gray-300 mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Popular Tags */}
            <div className="mb-8">
              <LabelTag>Popular Tags</LabelTag>
              <Card className="shadow-md border-0">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Gallery */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Thư viện ảnh</LabelTag>
              <div className="border-0 shadow-sm p-0">
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((item, index) => (
                    <div key={index}>
                      <Image
                        src={item.image}
                        alt="Gallery Image"
                        className="w-full"
                        imageClassName={`w-full h-32 object-cover transition-transform duration-500 rounded-2xl p-0`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
