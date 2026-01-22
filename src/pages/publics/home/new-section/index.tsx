import Title from "@/components/ui/Tilte";
import { useLatestNews } from "@/hooks/news";
import { useRouter } from "@/routes/hooks";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";

export default function NewSection() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { data: newsArticles, isLoading } = useLatestNews();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
    return { day, month };
  };

  const renderSkeletonCard = () => (
    <div className="relative overflow-hidden rounded-3xl h-120">
      <Skeleton width="100%" height="30rem" />
    </div>
  );

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
            onClick={() => router.push("/news")}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>{renderSkeletonCard()}</div>
            ))
          ) : newsArticles.length > 0 ? (
            newsArticles.map((article) => {
              const isHovered = hoveredCard === article.id;
              const { day, month } = formatDate(article.createdAt);
              const images = article.__images__ || article.images || [];
              const imageUrl = images.length > 0 ? images[0].fileUrl : "";
              return (
                <div
                  key={article.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => router.push(`/news/${article.id}`)}
                >
                  <div className="relative overflow-hidden rounded-3xl h-120 transition-all duration-500 transform hover:scale-105">
                    <img
                      src={imageUrl}
                      alt={article.titleVI || article.titleEN}
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
                        {day}
                      </div>
                      <div
                        className="text-xs font-semibold tracking-wider"
                        style={{ color: "#0d7377" }}
                      >
                        {month}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="mb-3">
                        <span
                          className="text-sm font-medium tracking-wide"
                          style={{ color: "#f7a325" }}
                        >
                          {article.type || "NEWS"}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                        {article.titleVI || article.titleEN}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-white/60">Chưa có bài viết nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
