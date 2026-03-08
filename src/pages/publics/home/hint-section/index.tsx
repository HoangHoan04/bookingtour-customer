import { enumData } from "@/common/enums/enum";
import Title from "@/components/ui/Tilte";
import { useGetTravelHints } from "@/hooks/travel-hint";
import { useRouter } from "@/routes/hooks";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { PUBLIC_ROUTES } from "../../../../routes/routes";

const getCardSize = (index: number): "large" | "medium" | "small" => {
  const pattern = index % 9;
  if (pattern === 0 || pattern === 4) return "large";
  if (pattern === 1 || pattern === 5) return "medium";
  return "small";
};

export default function HintMonthSection() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const router = useRouter();
  const { data: travelHints = [], isLoading } = useGetTravelHints(
    selectedType || undefined,
  );

  const getMonthColor = (month: number) => {
    return Object.values(enumData.MONTHS)[month - 1]?.color || "#3b82f6";
  };

  const getMonthName = (month: number) => {
    return Object.values(enumData.MONTHS)[month - 1]?.name || `Tháng ${month}`;
  };

  const getImageUrl = (hint: any) => {
    if (hint.images && hint.images.length > 0) {
      return hint.images[0].fileUrl;
    }
  };

  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Title>Gợi ý điểm đến theo tháng</Title>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
          Khám phá điểm đến lý tưởng cho mỗi tháng trong năm
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6 max-w-7xl mx-auto shadow-sm border-0">
        <Dropdown
          value={selectedType}
          onChange={(e) => setSelectedType(e.value)}
          options={Object.values(enumData.TRAVEL_TYPE).map((type) => ({
            label: type.name,
            value: type.value,
          }))}
          placeholder="Chọn loại tour"
          className="w-1/2"
          showClear
        />
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <i className="pi pi-spin pi-spinner text-5xl text-purple-600 mb-4"></i>
          <p className="text-lg text-gray-600 font-medium">
            Đang tải dữ liệu...
          </p>
        </div>
      ) : travelHints.length === 0 ? (
        <div className="text-center py-16">
          <i className="pi pi-inbox text-6xl text-gray-300 mb-4"></i>
          <p className="text-lg text-gray-500">Không có dữ liệu</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[90px] gap-3">
            {travelHints.map((hint, index) => {
              const isHovered = hoveredMonth === hint.id;
              const size = getCardSize(index);
              const color = getMonthColor(hint.month);
              const monthName = getMonthName(hint.month);

              return (
                <div
                  key={hint.id}
                  className={`${
                    size === "large"
                      ? "md:col-span-2 md:row-span-4"
                      : size === "medium"
                        ? "md:col-span-2 md:row-span-3"
                        : "md:col-span-2 md:row-span-2"
                  }`}
                  onMouseEnter={() => setHoveredMonth(hint.id)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <div
                    className="relative h-full w-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                    style={{
                      borderRadius: "16px",
                    }}
                  >
                    {/* Image with enhanced zoom effect */}
                    <img
                      src={getImageUrl(hint)}
                      alt={hint.locationName}
                      className="w-full h-full object-cover transition-all duration-700 brightness-90"
                      style={{
                        transform: isHovered ? "scale(1.15)" : "scale(1)",
                        filter: isHovered
                          ? "brightness(0.85)"
                          : "brightness(0.9)",
                      }}
                    />

                    {/* Gradient overlay - smoother and more vibrant */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${color}f5 0%, ${color}aa 40%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0.9,
                      }}
                    />

                    {/* Month badge - redesigned with better contrast */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1.5 backdrop-blur-lg shadow-lg flex items-center gap-2 transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "12px",
                        transform: isHovered
                          ? "translateY(-2px)"
                          : "translateY(0)",
                      }}
                    >
                      <i
                        className="pi pi-calendar text-sm"
                        style={{ color }}
                      ></i>
                      <span className="font-bold text-gray-800 text-sm tracking-wide">
                        {monthName}
                      </span>
                    </div>

                    {/* Content section - better spacing and typography */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {/* Location title with icon */}
                      <div className="flex items-start gap-2 mb-2">
                        <i className="pi pi-map-marker text-lg mt-0.5 drop-shadow-lg"></i>
                        <h3 className="text-xl font-bold leading-tight drop-shadow-lg">
                          {hint.locationName}
                        </h3>
                      </div>

                      {/* Description with better readability */}
                      <p className="text-white/95 text-sm font-medium line-clamp-2 mb-2 drop-shadow-md leading-relaxed">
                        {hint.description ||
                          hint.reason ||
                          `${hint.city}, ${hint.country}`}
                      </p>

                      {/* Tags with enhanced styling */}
                      {hint.tags && hint.tags.length > 0 && (
                        <div className="flex gap-1.5 mb-2 flex-wrap">
                          {hint.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded-lg bg-white/25 backdrop-blur-md border border-white/30 font-medium"
                              style={{
                                transition: "all 0.3s ease",
                                transform: isHovered
                                  ? "translateY(-2px)"
                                  : "translateY(0)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Explore button with smooth animation */}
                      <div
                        className="flex items-center gap-2 transition-all duration-400 text-sm font-semibold"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered
                            ? "translateY(0)"
                            : "translateY(15px)",
                        }}
                      >
                        <button
                          className="drop-shadow-lg"
                          onClick={() =>
                            router.push(`/travel-hint-detail/${hint.id}`)
                          }
                        >
                          Khám phá ngay
                        </button>
                        <i className="pi pi-arrow-right drop-shadow-lg"></i>
                      </div>
                    </div>

                    {/* Decorative icon with rotation effect */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg transition-all duration-500 shadow-lg"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        transform: isHovered
                          ? "scale(1.15) rotate(180deg)"
                          : "scale(1) rotate(0deg)",
                      }}
                    >
                      <i className="pi pi-compass text-white text-sm drop-shadow-lg"></i>
                    </div>

                    {/* Shine effect on hover */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-10 text-center">
        <div className="p-6  rounded-2xl">
          <p className="text-gray-700 mb-4 text-base font-medium">
            Cần tư vấn chi tiết hơn về các điểm đến?
          </p>
          <Button
            className="px-6 py-3 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 text-base border-0"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
            raised
            onClick={() => router.push(PUBLIC_ROUTES.CONTACT)}
          >
            <i className="pi pi-phone text-lg"></i>
            Liên hệ với chúng tôi
          </Button>
        </div>
      </div>
    </div>
  );
}
