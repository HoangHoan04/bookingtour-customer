import { enumData } from "@/common/enums/enum";
import BannerComponent from "@/components/ui/banner";
import Title from "@/components/ui/Tilte";
import { useState } from "react";

export default function ServiceScreen() {
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
        <BannerComponent type={enumData.BANNER_TYPE.SERVICES.code} />
      </section>
      <section className="bg-[#004d4d] py-6 mt-16  px-4">
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
    </div>
  );
}
