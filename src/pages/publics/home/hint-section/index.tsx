import Title from "@/components/ui/Tilte";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState } from "react";

export default function HintMonthSection() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const monthlyDestinations = [
    {
      month: "January",
      monthNumber: 1,
      destination: "Switzerland",
      description: "Perfect skiing season in the Alps",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      color: "#60a5fa",
      size: "large",
    },
    {
      month: "February",
      monthNumber: 2,
      destination: "Japan",
      description: "Cherry blossom season begins",
      image:
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
      color: "#f472b6",
      size: "medium",
    },
    {
      month: "March",
      monthNumber: 3,
      destination: "Morocco",
      description: "Pleasant weather, fewer tourists",
      image:
        "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
      color: "#fb923c",
      size: "small",
    },
    {
      month: "April",
      monthNumber: 4,
      destination: "Netherlands",
      description: "Tulip fields in full bloom",
      image:
        "https://images.unsplash.com/photo-1534577116079-e6650fc07c92?w=800&q=80",
      color: "#a78bfa",
      size: "small",
    },
    {
      month: "May",
      monthNumber: 5,
      destination: "Greece",
      description: "Warm weather, perfect beaches",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      color: "#22d3ee",
      size: "large",
    },
    {
      month: "June",
      monthNumber: 6,
      destination: "Iceland",
      description: "Midnight sun and green landscapes",
      image:
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      color: "#4ade80",
      size: "medium",
    },
    {
      month: "July",
      monthNumber: 7,
      destination: "Norway",
      description: "Best time for fjords exploration",
      image:
        "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80",
      color: "#818cf8",
      size: "small",
    },
    {
      month: "August",
      monthNumber: 8,
      destination: "Bali",
      description: "Dry season, perfect for beaches",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      color: "#fbbf24",
      size: "small",
    },
    {
      month: "September",
      monthNumber: 9,
      destination: "Italy",
      description: "Harvest season, wine festivals",
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      color: "#f87171",
      size: "large",
    },
    {
      month: "October",
      monthNumber: 10,
      destination: "Scotland",
      description: "Autumn colors and whisky tours",
      image:
        "https://images.unsplash.com/photo-1585155293339-47e8e0fa03f1?w=800&q=80",
      color: "#fb7185",
      size: "small",
    },
    {
      month: "November",
      monthNumber: 11,
      destination: "Thailand",
      description: "Cool dry season begins",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      color: "#a855f7",
      size: "medium",
    },
    {
      month: "December",
      monthNumber: 12,
      destination: "Dubai",
      description: "Perfect weather for exploration",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      color: "#14b8a6",
      size: "small",
    },
  ];

  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Title>Gợi ý điểm đến theo tháng</Title>
        </div>
        <p className="text-base text-gray-600 max-w-3xl mx-auto">
          Khám phá điểm đến lý tưởng cho mỗi tháng trong năm.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[90px] gap-2">
          {monthlyDestinations.map((item) => {
            const isHovered = hoveredMonth === item.monthNumber;

            return (
              <div
                key={item.monthNumber}
                className={`${
                  item.size === "large"
                    ? "md:col-span-2 md:row-span-4"
                    : item.size === "medium"
                      ? "md:col-span-2 md:row-span-3"
                      : "md:col-span-2 md:row-span-2"
                }`}
                onMouseEnter={() => setHoveredMonth(item.monthNumber)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <div
                  className="relative h-full w-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.destination}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                    }}
                  />

                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${item.color}ee, transparent 60%)`,
                      opacity: isHovered ? 1 : 0.85,
                    }}
                  />

                  <div
                    className="absolute top-2 left-2 px-2 py-1 backdrop-blur-md shadow-md flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                    }}
                  >
                    <i
                      className="pi pi-calendar text-xs"
                      style={{ color: item.color }}
                    ></i>
                    <span className="font-bold text-gray-800 text-xs">
                      {item.month}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <i className="pi pi-map-marker text-sm"></i>
                      <h3 className="text-base font-bold">
                        {item.destination}
                      </h3>
                    </div>
                    <p className="text-white/90 text-xs font-medium line-clamp-1">
                      {item.description}
                    </p>

                    <div
                      className="flex items-center gap-1 transition-all duration-300 text-xs mt-1"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateY(0)"
                          : "translateY(10px)",
                      }}
                    >
                      <i className="pi pi-arrow-right text-xs"></i>
                      <span className="font-semibold">Explore</span>
                    </div>
                  </div>

                  <div
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: isHovered
                        ? "scale(1.2) rotate(180deg)"
                        : "scale(1) rotate(0deg)",
                    }}
                  >
                    <i className="pi pi-sun text-white text-xs"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 text-center">
        <div className="p-4">
          <Button className="px-5 py-2 bg-white text-purple-600 font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-sm">
            <i className="pi pi-phone"></i>
            Liên hệ với chúng tôi để được tư vấn chi tiết hơn
          </Button>
        </div>
      </div>
    </div>
  );
}
