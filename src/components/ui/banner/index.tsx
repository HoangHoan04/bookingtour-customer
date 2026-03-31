import type { BannerDto } from "@/dto/banner.dto";
import { useBanners } from "@/hooks/banner";
import { useEffect, useState } from "react";

interface BannerComponentProps {
  type?: string;
}

const BannerComponent = ({ type = "HOME" }: BannerComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: banners, isLoading, isError } = useBanners(type);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const handleBannerClick = (url?: string) => {
    if (url) {
      console.log("Navigate to:", url);
    }
  };

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto h-[80vh] rounded-3xl bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500 text-xl">Đang tải...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full max-w-7xl mx-auto h-[80vh] rounded-3xl bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">Không thể tải banner</div>
      </section>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto h-[80vh] rounded-3xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500 text-xl font-medium">Không có banner</p>
          <p className="text-gray-400 text-sm mt-2">
            Chưa có banner nào được hiển thị
          </p>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </section>
    );
  }

  const currentBanner = banners[currentIndex];
  const imageUrl =
    currentBanner.image && currentBanner.image.length > 0
      ? currentBanner.image[0].fileUrl
      : "";

  const thumbnailTemplate = (banner: BannerDto, index: number) => {
    const thumbImageUrl =
      banner.image && banner.image.length > 0 ? banner.image[0].fileUrl : "";

    return (
      <button
        onClick={() => setCurrentIndex(index)}
        className={`relative rounded-3xl transition-all duration-300 ${
          index === currentIndex
            ? "shadow-2xl scale-105 z-10 border-4 border-white"
            : "opacity-50 hover:opacity-75 "
        }`}
      >
        <div className="relative rounded-3xl h-16 w-28">
          <img
            src={thumbImageUrl}
            alt={banner.title}
            className="w-full rounded-3xl h-full object-cover"
            loading="lazy"
          />
          {index !== currentIndex && (
            <div className="absolute inset-0 rounded-3xl bg-black/40"></div>
          )}
        </div>
      </button>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto h-[80vh] rounded-3xl relative overflow-hidden">
      <div
        className="relative w-full h-full group cursor-pointer"
        onClick={() => handleBannerClick(currentBanner.url)}
      >
        <img
          src={imageUrl}
          alt={currentBanner.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-6 right-6 z-10">
          <div className="flex flex-col gap-4 max-h-[70vh] py-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent">
            {banners.map((banner, index) => (
              <div key={banner.id} className="px-1">
                {thumbnailTemplate(banner, index)}
              </div>
            ))}
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(
                  (prev) => (prev - 1 + banners.length) % banners.length,
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous banner"
            >
              <i className="pi pi-chevron-left"></i>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev + 1) % banners.length);
              }}
              className="absolute right-40 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next banner"
            >
              <i className="pi pi-chevron-right"></i>
            </button>
          </>
        )}

        <div className="absolute bottom-8 left-8 right-8 z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl">
            {currentBanner.title}
          </h2>
          {currentBanner.titleEn && (
            <p className="text-lg md:text-xl mt-2 text-white drop-shadow-lg">
              {currentBanner.titleEn}
            </p>
          )}
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full bg-white ${
                  index === currentIndex
                    ? "w-8 h-2 opacity-100"
                    : "w-2 h-2 opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerComponent;
