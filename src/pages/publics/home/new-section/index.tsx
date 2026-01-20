import Title from "@/components/ui/Tilte";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState } from "react";

export default function NewSection() {
  const newsArticles = [
    {
      id: 1,
      title: "The Top Travel Destinations for Photography Enthusiasts",
      author: "Joey Peterson",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      date: "05",
      month: "JUNE",
    },
    {
      id: 2,
      title: "The Best Ways to Travel with Your Significant Other",
      author: "Aliena Smith",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      date: "06",
      month: "JUNE",
    },
    {
      id: 3,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Title>Khám phá những tin tức mới nhất</Title>

            <p className="text-white/80 max-w-xl text-sm leading-relaxed">
              Cập nhật các bài viết mới nhất về du lịch, mẹo hay và xu hướng nổi
              bật.
            </p>
          </div>

          <Button
            label="Xem tất cả tin tức"
            className="border-none font-semibold px-8 py-3 text-base rounded-full"
            style={{
              background: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)",
              color: "#0d7377",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => {
            const isHovered = hoveredCard === article.id;

            return (
              <div
                key={article.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden rounded-3xl h-120 transition-all duration-500 transform hover:scale-105">
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

                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl text-center min-w-17.5 shadow-lg">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#0d7377" }}
                    >
                      {article.date}
                    </div>
                    <div
                      className="text-xs font-semibold tracking-wider"
                      style={{ color: "#0d7377" }}
                    >
                      {article.month}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-3">
                      <span
                        className="text-sm font-medium tracking-wide"
                        style={{ color: "#f7a325" }}
                      >
                        By {article.author}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
