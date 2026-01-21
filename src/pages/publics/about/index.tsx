import { travel } from "@/assets/animations";
import BannerComponent from "@/components/ui/banner";
import SendEmailComponent from "@/components/ui/send-email";
import Title from "@/components/ui/Tilte";
import Lottie from "lottie-react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";
import PopularDestinationsSection from "../home/destination-section";

export default function TravelLandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const newsArticles = [
    {
      id: 1,
      title: "Hướng dẫn viên",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    },
    {
      id: 2,
      title: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    },
    {
      id: 3,
      title: "Chuyến bay",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 4,
      title: "Taxi & Metro",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 5,
      title: "Khách sạn",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 6,
      title: "Spa & Massage",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 7,
      title: "Ẩm thực",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 8,
      title: "Picnic & BBQ",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-4">
        <BannerComponent type="ABOUT" />
      </section>

      <section className="bg-[#004d4d] py-6 mt-16  px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center max-w-7xl mx-auto">
          <div className="flex justify-content-center items-center">
            <Lottie
              animationData={travel}
              loop={true}
              autoplay={true}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid meet",
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <i className="pi pi-sparkles text-yellow-600"></i>
              <span className="text-sm font-semibold text-yellow-700">
                Monthly Recommendations
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
              We{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500">
                Recommend
              </span>{" "}
              Beautiful Destinations Every Month
            </h2>

            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              We are passionate about travel and dedicated to providing you with
              the best destinations. Our curated selection ensures unforgettable
              experiences every month. Trust us to guide you to amazing places
              around the world.
            </p>

            <Card className="border-none shadow-xl bg-linear-to-br from-white to-cyan-50 mb-6">
              <div className="flex items-center gap-3 mb-4 pb-3 border-bottom-1 border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl">
                  <i className="pi pi-compass text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold  m-0">Travel Guide</h3>
              </div>

              <div className="flex flex-column gap-4 mb-5">
                <div className="flex gap-4 align-items-start p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg shrink-0">
                    <i className="pi pi-map-marker text-green-600 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 m-0 mb-1 text-lg">
                      Tricky to Pinpoint
                    </p>
                    <p className="text-gray-600 m-0">
                      All you need to do is plan your trip with our expert
                      guidance
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 align-items-start p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg shrink-0">
                    <i className="pi pi-calendar text-blue-600 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 m-0 mb-1 text-lg">
                      Best Time to Visit
                    </p>
                    <p className="text-gray-600 m-0">
                      We'll guide you with the perfect seasons for each
                      destination
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-content-between items-center gap-4 pt-4 border-top-1 border-gray-200">
                <Button
                  label="Discover More"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  className="bg-linear-to-r from-green-500 to-emerald-500 border-none px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  rounded
                />

                <div className="flex items-center gap-3">
                  <div className="flex">
                    <Avatar
                      icon="pi pi-user"
                      className="bg-blue-300 text-white border-3 border-white shadow-md"
                      shape="circle"
                      size="large"
                    />
                    <Avatar
                      icon="pi pi-user"
                      className="bg-pink-300 text-white border-3 border-white shadow-md"
                      style={{ marginLeft: "-1rem" }}
                      shape="circle"
                      size="large"
                    />
                    <Avatar
                      icon="pi pi-user"
                      className="bg-yellow-300 text-white border-3 border-white shadow-md"
                      style={{ marginLeft: "-1rem" }}
                      shape="circle"
                      size="large"
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-500 m-0">
                      2.5k+
                    </p>
                    <p className="text-sm text-gray-600 m-0 font-semibold">
                      Happy Travelers
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <i className="pi pi-shield text-green-500"></i>
                <span className="text-sm font-semibold text-gray-700">
                  Trusted Service
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <i className="pi pi-verified text-blue-500"></i>
                <span className="text-sm font-semibold text-gray-700">
                  Verified Reviews
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <i className="pi pi-heart-fill text-red-500"></i>
                <span className="text-sm font-semibold text-gray-700">
                  Customer Favorite
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 ">
        <PopularDestinationsSection />
      </section>

      <section className="bg-[#004d4d] py-20 px-4 text-center">
        <div className="text-center mb-6">
          <Title>Dịch vụ của chúng tôi</Title>
          <p className="text-xl text-slate-600  mx-auto font-light leading-relaxed">
            Hãy để chúng tôi giúp bạn biến ước mơ du lịch của bạn thành hiện
            thực.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {newsArticles.map((article) => {
            const isHovered = hoveredCard === article.id;

            return (
              <div
                key={article.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden rounded-3xl h-72 transition-all duration-500 transform hover:scale-105">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: isHovered
                        ? "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-right mt-20 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-3" style={{ color: "white" }}>
            Dịch vụ tuyệt vời dành cho bạn
          </h3>
          <h1 className="text-5xl   mb-3" style={{ color: "#ffaa0d" }}>
            Các dịch vụ chúng tôi cung cấp
          </h1>
        </div>
      </section>

      <SendEmailComponent />
    </div>
  );
}
