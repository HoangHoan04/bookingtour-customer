import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import BookingSteps from "@/components/ui/booking-step";
import SendEmailComponent from "@/components/ui/send-email";
import Title from "@/components/ui/Tilte";
import { usePaginationTourGuide } from "@/hooks/tour-guide";
import { useRouter } from "@/routes/hooks";
import { Paginator } from "primereact/paginator";
import { Rating } from "primereact/rating";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";

export default function TourGuideScreen() {
  const router = useRouter();
  const [first, setFirst] = useState(0);
  const itemsPerPage = 9;

  const onPageChange = (event: any) => {
    setFirst(event.first);
  };

  const {
    data: tourGuides,
    total,
    isLoading,
  } = usePaginationTourGuide({
    skip: first,
    take: itemsPerPage,
    where: {},
  });

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getAvatarUrl = (tourGuide: any) => {
    if (tourGuide.avatar && tourGuide.avatar.length > 0) {
      return tourGuide.avatar[0].fileUrl;
    }
    return "https://via.placeholder.com/400x500?text=No+Avatar";
  };

  const tourGuideTemplate = (tourGuide: any) => {
    const isHovered = hoveredCard === tourGuide.id;
    const avatarUrl = getAvatarUrl(tourGuide);

    return (
      <div
        className="p-0 cursor-pointer m-0"
        onMouseEnter={() => setHoveredCard(tourGuide.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div
          className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          style={{
            borderRadius: "24px",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          }}
          onClick={() =>
            router.push(`/tour-guide/${tourGuide.slug || tourGuide.id}`)
          }
        >
          <div className="relative overflow-hidden">
            <img
              src={avatarUrl}
              alt={tourGuide.name}
              className="w-full h-80 object-cover transition-transform duration-700"
              style={{
                transform: isHovered ? "scale(1.15)" : "scale(1)",
                filter: isHovered ? "brightness(0.85)" : "brightness(1)",
              }}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to top, rgba(15, 118, 110, 0.9) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 70%)",
                opacity: isHovered ? 1 : 0.75,
              }}
            />

            {/* Name Section */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 "
                  style={{
                    transform: isHovered
                      ? "scale(1.1) rotate(360deg)"
                      : "scale(1) rotate(0deg)",
                  }}
                >
                  <i className="pi pi-user text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {tourGuide.name}
                  </h3>
                  {tourGuide.code && (
                    <p className="text-sm font-medium text-white/90">
                      ID: {tourGuide.code}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            {tourGuide.isAvailable && (
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1">
                  <i className="pi pi-check-circle"></i>
                  <span>Sẵn sàng</span>
                </div>
              </div>
            )}
            {!tourGuide.isAvailable && (
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1">
                  <i className="pi pi-times-circle"></i>
                  <span>Đang bận</span>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-3 bg-white dark:bg-gray-800">
            {/* Short Bio or Description */}
            {(tourGuide.shortBio || tourGuide.description) && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                {tourGuide.shortBio || tourGuide.description}
              </p>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {/* Experience */}
              {tourGuide.yearsOfExperience && (
                <div className="text-center p-2 rounded-xl">
                  <i className="pi pi-briefcase text-blue-600 dark:text-blue-400 text-lg mb-1"></i>
                  <p className="text-xs">Kinh nghiệm</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {tourGuide.yearsOfExperience} năm
                  </p>
                </div>
              )}

              {/* Rating */}
              <div className="text-center p-2 rounded-xl">
                <div className="flex justify-center items-center mb-1">
                  <p className="text-xs mr-3">Đánh giá: </p>
                  <Rating
                    value={Number(tourGuide.averageRating)}
                    readOnly
                    cancel={false}
                    className="text-sm"
                    pt={{
                      onIcon: { className: " text-xs" },
                      offIcon: { className: " text-xs" },
                    }}
                  />
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {tourGuide.totalReviews > 0 && (
                    <span className="text-xs font-normal ml-1">
                      ({tourGuide.totalReviews})
                    </span>
                  )}
                </p>
              </div>

              {/* Tours Completed */}
              <div className="text-center p-2 rounded-xl">
                <p className="text-sm font-bold flex text-gray-900 dark:text-white">
                  <p className="text-xs ">Tour hoàn thành:</p>
                  {tourGuide.totalToursCompleted}
                </p>
              </div>
            </div>

            {/* Languages */}
            {tourGuide.languages && tourGuide.languages.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="pi pi-globe text-purple-600 dark:text-purple-400"></i>
                  <span className="text-sm font-semibold ">Ngôn ngữ:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tourGuide.languages.map((lang: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specialties */}
            {tourGuide.specialties && tourGuide.specialties.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="pi pi-star text-orange-600 dark:text-orange-400"></i>
                  <span className="text-sm font-semibold ">Chuyên môn:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tourGuide.specialties
                    .slice(0, 3)
                    .map((specialty: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-2">
                <i className="pi pi-phone text-teal-600 dark:text-teal-400"></i>
                <span className="text-sm">{tourGuide.phone}</span>
              </div>
              {tourGuide.email && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-4">
                  <i className="pi pi-envelope text-teal-600 dark:text-teal-400"></i>
                  <span className="text-sm">{tourGuide.email}</span>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="transition-transform hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
                >
                  <img
                    src={FacebookIcon}
                    alt="Facebook"
                    className="w-7 h-7 object-contain"
                  />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="transition-transform hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
                >
                  <img
                    src={YoutubeIcon}
                    alt="Youtube"
                    className="w-10 h-7 object-contain"
                  />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="transition-transform hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
                >
                  <img
                    src={ZaloIcon}
                    alt="Zalo"
                    className="w-10 h-7 object-contain"
                  />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  className="transition-transform hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
                >
                  <img
                    src={TiktokIcon}
                    alt="Tiktok"
                    className="w-10 h-7 object-contain"
                  />
                </a>
              </div>
            </div>

            {/* View Details Button */}
            <div
              className="mt-4 text-center transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <div className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm">
                <span>Xem chi tiết</span>
                <i className="pi pi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const skeletonTemplate = () => (
    <div className="p-0">
      <div
        className="overflow-hidden shadow-lg bg-white dark:bg-gray-800"
        style={{ borderRadius: "24px" }}
      >
        <Skeleton height="20rem" />
        <div className="p-6">
          <Skeleton className="mb-3" />
          <Skeleton width="70%" className="mb-4" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton height="4rem" />
            <Skeleton height="4rem" />
            <Skeleton height="4rem" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Title>Kết nối với hướng dẫn viên</Title>
          <p className="text-xl text-slate-500 dark:text-slate-400 mx-auto font-light leading-relaxed max-w-3xl">
            Tìm kiếm và kết nối với những hướng dẫn viên du lịch chuyên nghiệp
            để có những trải nghiệm tuyệt vời nhất trong chuyến đi của bạn.
          </p>
        </div>

        {/* Tour Guides Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index}>{skeletonTemplate()}</div>
            ))}
          </div>
        ) : tourGuides.length === 0 ? (
          <div className="text-center py-16">
            <i className="pi pi-users text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Chưa có hướng dẫn viên nào
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourGuides.map((tourGuide: any) => (
                <div key={tourGuide.id}>{tourGuideTemplate(tourGuide)}</div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Paginator
                first={first}
                rows={itemsPerPage}
                totalRecords={total}
                onPageChange={onPageChange}
                className="custom-grid-paginator"
              />
            </div>
          </>
        )}
      </section>

      <BookingSteps />

      {/* Wave Separator */}
      <svg
        className="w-full h-24"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C240 40 480 80 720 80C960 80 1200 40 1440 0V120H0V0Z"
          fill="#FFA500"
        />
      </svg>

      {/* Newsletter Subscription */}
      <SendEmailComponent
        onSuccess={(email) => {
          console.log("User subscribed with email:", email);
        }}
        onError={(error) => {
          console.error("Subscription failed:", error);
        }}
      />
    </div>
  );
}
