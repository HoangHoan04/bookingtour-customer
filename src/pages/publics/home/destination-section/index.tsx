import Title from "@/components/ui/Tilte";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState } from "react";

export default function PopularDestinationsSection() {
  const destinations = [
    {
      id: 1,
      name: "Switzerland",
      tours: 3,
      image:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
    },
    {
      id: 2,
      name: "Thailand",
      tours: 7,
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    },
    {
      id: 3,
      name: "Hong Kong",
      tours: 4,
      image:
        "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80",
    },
    {
      id: 4,
      name: "Sri Lanka",
      tours: 3,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    {
      id: 5,
      name: "Singapore",
      tours: 3,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
        className="p-3 flex rounded-lg h-full"
        onMouseEnter={() => setHoveredCard(destination.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{ height: "100%" }}
      >
        <div
          className="overflow-hidden border-none rounded-lg hover:shadow-2xl transition-all duration-300 flex flex-col w-full"
          style={{ height: "100%" }}
        >
          <div className="relative overflow-hidden group rounded-2xl">
            <Image
              src={destination.image}
              alt={destination.name}
              className="w-full"
              imageClassName={`w-full h-96 object-cover transition-transform duration-500 rounded-2xl ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full shadow-md">
              <span className="text-sm font-semibold text-blue-600">
                {destination.tours} tours
              </span>
            </div>
            <div
              className={`absolute inset-0  transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-70"
              }`}
            />

            <div className="p-6  flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm  uppercase tracking-wide mb-1">
                    Destination
                  </p>
                  <h3 className="text-xl font-bold  mb-1">
                    {destination.name}
                  </h3>
                </div>
              </div>

              <Button
                label="View all tours"
                className="w-full mt-4 bg-linear-to-r from-blue-500 to-blue-600 border-none hover:from-blue-600 hover:to-blue-700"
                icon="pi pi-compass"
              />
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

      <div className="max-w-7xl mx-auto mt-5">
        <Card className="bg-linear-to-r from-blue-500 to-blue-700 border-none shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div className="flex items-center gap-6 text-white">
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
