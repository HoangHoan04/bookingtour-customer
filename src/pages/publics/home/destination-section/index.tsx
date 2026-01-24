import Title from "@/components/ui/Tilte";
import { usePopularDestination } from "@/hooks/destination";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { useState } from "react";

export default function PopularDestinationsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { data: destinations } = usePopularDestination();
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
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

  const destinationTemplate = (destination: any) => {
    const isHovered = hoveredCard === destination.id;

    return (
      <div
        className="p-3"
        onMouseEnter={() => setHoveredCard(destination.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group">
          {/* Image Container */}
          <div className="relative overflow-hidden h-96 rounded-2xl">
            <Image
              src={destination.image?.fileUrl || "/placeholder.jpg"}
              alt={destination.image?.fileName || destination.name}
              className="w-full h-full"
              imageClassName={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Tour Count Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold text-blue-600">
                {destination.touringCount}{" "}
                {destination.touringCount === 1 ? "tour" : "tours"}
              </span>
            </div>

            {/* Status Badge (if needed) */}
            {destination.status === "NEW" && (
              <div className="absolute top-4 left-4 bg-linear-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-bold text-white">Mới</span>
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <i className="pi pi-map-marker text-sm"></i>
                    <p className="text-sm font-medium">
                      {destination.region}, {destination.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Preview */}
              {destination.description && (
                <p className="text-sm text-white/80 line-clamp-2 mb-4">
                  {destination.description}
                </p>
              )}

              {/* Additional Info */}
              <div className="flex items-center gap-4 mb-4 text-xs text-white/70">
                {destination.bestTimeToVisit && (
                  <div className="flex items-center gap-1">
                    <i className="pi pi-calendar"></i>
                    <span>Tháng {destination.bestTimeToVisit}</span>
                  </div>
                )}
                {destination.averageTemperature && (
                  <div className="flex items-center gap-1">
                    <i className="pi pi-sun"></i>
                    <span>{destination.averageTemperature}°C</span>
                  </div>
                )}
                {destination.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <i className="pi pi-star-fill text-yellow-400"></i>
                    <span>{destination.rating}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                label="Khám phá ngay"
                className={`w-full bg-white text-blue-600 border-none hover:bg-blue-50 font-semibold transition-all duration-300 ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-90"
                }`}
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </div>

          {/* Hover Effect Border */}
          <div
            className={`absolute inset-0 rounded-2xl border-2 border-blue-500 transition-opacity duration-300 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 px-2">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Title>Các điểm đến phổ biến</Title>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá các điểm đến hàng đầu được yêu thích bởi khách du lịch trên
          toàn thế giới.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Carousel
          value={destinations}
          numVisible={4}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={destinationTemplate}
          circular
          autoplayInterval={5000}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-1">
        <Card className="bg-linear-to-r from-blue-500 to-blue-700 border-none shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-1">
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
              label="Tìm tour ngay"
              icon="pi pi-arrow-right"
              iconPos="right"
              className=" text-blue-600 border-none  font-bold px-8 py-3 text-lg whitespace-nowrap"
              raised
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
