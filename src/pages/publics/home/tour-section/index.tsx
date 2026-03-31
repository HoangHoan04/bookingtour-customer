import Title from "@/components/ui/Tilte";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useState } from "react";

export default function PopularTourSection() {
  const tours = [
    {
      id: 1,
      name: "Bali, Indonesia",
      durations: 8,
      price: 59,
      description:
        "Nusa Penida is a stunning island located just southeast of Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    },
    {
      id: 2,
      name: "South Korea",
      durations: 4,
      price: 75,
      description:
        "Deogyusan mountain. Its highest peak is 1,614 m. above sea level",
      image:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    },
    {
      id: 3,
      name: "Tokyo City Japan",
      durations: 6,
      price: 99,
      description:
        "The bridge offers panoramic views of Tokyo Tower, the skyline.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    },
    {
      id: 4,
      name: "Switzerland",
      durations: 5,
      price: 120,
      description: "Experience the beauty and culture of this amazing tour",
      image:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
    },
    {
      id: 5,
      name: "Thailand",
      durations: 7,
      price: 65,
      description:
        "Discover tropical paradise with stunning beaches and culture",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const tourTemplate = (tour: any) => {
    const isHovered = hoveredCard === tour.id;
    const nights = Math.ceil(tour.durations / 2);

    return (
      <div
        className="p-3"
        onMouseEnter={() => setHoveredCard(tour.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div
          className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          style={{
            borderRadius: "24px",
            background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-80 object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />

            <div
              className="absolute top-6 left-0 px-6 py-3 shadow-lg flex items-center gap-2"
              style={{
                backgroundColor: "#0d7377",
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
            >
              <i className="pi pi-calendar text-white"></i>
              <span className="text-sm font-semibold text-white">
                {tour.durations} days, {nights} Nights
              </span>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(13, 115, 119, 0.9), transparent)",
              }}
            >
              <div className="flex items-center gap-2 text-white">
                <i className="pi pi-map-marker text-2xl"></i>
                <h3 className="text-2xl font-bold">{tour.name}</h3>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className="text-4xl font-bold"
                  style={{ color: "#ffa500" }}
                >
                  ${tour.price}
                </span>
                <span className="text-gray-500">Per Day</span>
              </div>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ color: "#0d7377" }}
              >
                {tour.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                label="Book Now"
                className="text-sm font-semibold px-6 py-2"
                outlined
                style={{
                  borderColor: "#4ade80",
                  color: "#0d7377",
                  borderRadius: "25px",
                  borderWidth: "2px",
                  backgroundColor: "transparent",
                }}
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">(4.8 Review)</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className="pi pi-star-fill"
                      style={{ color: "#ffa500", fontSize: "0.9rem" }}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 px-2">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <i className="pi pi-map-marker text-3xl text-blue-500"></i>
          <Title>Các tour du lịch phổ biến</Title>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá các tour du lịch hàng đầu được yêu thích bởi khách du lịch
          trên toàn thế giới.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Carousel
          value={tours}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={tourTemplate}
          circular
          autoplayInterval={5000}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
          <div className="flex items-center gap-6">
            <i className="pi pi-compass text-6xl hidden md:block"></i>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Sẵn sàng cho chuyến phiêu lưu tiếp theo?
              </h2>
              <p className="">
                Tìm kiếm và đặt tour du lịch hoàn hảo cho bạn ngay hôm nay!
              </p>
            </div>
          </div>
          <Button
            label="Bắt đầu ngay"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="font-bold px-8 py-3 text-lg whitespace-nowrap"
            raised
            style={{
              backgroundColor: "white",
              color: "#1d4ed8",
              border: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
