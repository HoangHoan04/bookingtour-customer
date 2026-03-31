import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import BookingSteps from "@/components/ui/booking-step";
import SendEmailComponent from "@/components/ui/send-email";
import Title from "@/components/ui/Tilte";
import type { TourGuide } from "@/dto/tour-guide.dto";
import { usePaginationTourGuide } from "@/hooks/tour-guide";
import { useRouter } from "@/routes/hooks";
import { Paginator } from "primereact/paginator";
import { Rating } from "primereact/rating";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";

const ITEMS_PER_PAGE = 9;

export default function TourGuideScreen() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data, total, isLoading } = usePaginationTourGuide({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    where: {},
  });

  const handlePageChange = (e: { first: number; rows: number }) => {
    setPage(Math.floor(e.first / e.rows) + 1);
  };

  const getAvatar = (guide: TourGuide) =>
    guide.avatar?.[0]?.fileUrl ||
    "https://via.placeholder.com/400x500?text=HDV";

  const renderGuideCard = (guide: TourGuide) => {
    const isHovered = hoveredId === guide.id;
    const avatar = getAvatar(guide);

    return (
      <div
        key={guide.id}
        className="group cursor-pointer"
        onMouseEnter={() => setHoveredId(guide.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => router.push(`/tour-guide/${guide.slug || guide.id}`)}
      >
        <div
          className={`
            rounded-3xl overflow-hidden shadow-lg transition-all duration-500
            ${isHovered ? "shadow-2xl -translate-y-3" : "shadow-lg"}
          `}
        >
          {/* Image + Overlay */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={avatar}
              alt={guide.name}
              className={`
                w-full h-full object-cover transition-transform duration-700
                ${isHovered ? "scale-110 brightness-90" : "scale-100"}
              `}
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-teal-900/80 via-transparent to-transparent transition-opacity duration-500"
              style={{ opacity: isHovered ? 0.95 : 0.75 }}
            />

            {/* Name & Availability */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {guide.name}
              </h3>
              {guide.code && (
                <p className="text-white/80 text-sm mt-1">ID: {guide.code}</p>
              )}
            </div>

            {guide.isAvailable ? (
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-md">
                  <i className="pi pi-check-circle" />
                  Sẵn sàng
                </span>
              </div>
            ) : (
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-md">
                  <i className="pi pi-times-circle" />
                  Đang bận
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 bg-white dark:bg-gray-800">
            {/* Bio */}
            {(guide.shortBio || guide.description) && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3">
                {guide.shortBio || guide.description}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              {guide.yearsOfExperience && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Kinh nghiệm
                  </p>
                  <p className="font-bold text-lg">
                    {guide.yearsOfExperience} năm
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Đánh giá
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Rating
                    value={guide.averageRating || 0}
                    readOnly
                    cancel={false}
                    pt={{ onIcon: { className: "text-sm" } }}
                  />
                  {guide.totalReviews ? (
                    <span className="text-xs text-gray-500">
                      ({guide.totalReviews})
                    </span>
                  ) : null}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tour hoàn thành
                </p>
                <p className="font-bold text-lg">
                  {guide.totalToursCompleted || 0}
                </p>
              </div>
            </div>

            {/* Languages & Specialties (nếu có) */}
            {guide.languages?.length ? (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Ngôn ngữ:</p>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Social */}
            <div className="flex justify-center gap-6 pt-4 border-t dark:border-gray-700">
              {[
                { icon: FacebookIcon, name: "Facebook" },
                { icon: YoutubeIcon, name: "YouTube" },
                { icon: ZaloIcon, name: "Zalo" },
                { icon: TiktokIcon, name: "TikTok" },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="transition hover:scale-110"
                >
                  <img src={item.icon} alt={item.name} className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className="rounded-3xl overflow-hidden shadow-lg dark:bg-gray-800">
      <Skeleton height="24rem" />
      <div className="p-6">
        <Skeleton height="2rem" className="mb-3" />
        <Skeleton height="1rem" width="70%" className="mb-6" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton height="5rem" />
          <Skeleton height="5rem" />
          <Skeleton height="5rem" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <Title className="">Hướng Dẫn Viên Du Lịch</Title>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Kết nối với những hướng dẫn viên chuyên nghiệp, giàu kinh nghiệm để
            có hành trình khám phá Việt Nam đáng nhớ.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>{renderSkeleton()}</div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <i className="pi pi-users text-7xl text-gray-300 dark:text-gray-600 mb-6" />
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              Hiện chưa có hướng dẫn viên nào
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map(renderGuideCard)}
            </div>

            <div className="mt-12 flex justify-center">
              <Paginator
                first={(page - 1) * ITEMS_PER_PAGE}
                rows={ITEMS_PER_PAGE}
                totalRecords={total}
                onPageChange={handlePageChange}
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                className="custom-paginator"
              />
            </div>
          </>
        )}
      </section>

      <BookingSteps />

      <SendEmailComponent />
    </div>
  );
}
