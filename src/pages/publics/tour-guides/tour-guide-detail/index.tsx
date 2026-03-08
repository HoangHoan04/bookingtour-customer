import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import Title from "@/components/ui/Tilte";
import type { TourGuide } from "@/dto/tour-guide.dto";
import { usePaginationTourGuide, useTourGuideDetail } from "@/hooks/tour-guide";
import { useRouter } from "@/routes/hooks";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TourGuideDetailScreen() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data: guide, isLoading: guideLoading } = useTourGuideDetail(slug);

  const { data: relatedGuides, isLoading: relatedLoading } =
    usePaginationTourGuide({
      skip: 0,
      take: 12,
      where: {},
    });

  const tourGuideTemplate = (tourGuide: TourGuide) => {
    const isHovered = hoveredCard === tourGuide.id;
    const avatar =
      tourGuide.avatar?.[0]?.fileUrl ||
      "https://via.placeholder.com/400x500?text=HDV";

    return (
      <div
        className="p-3 cursor-pointer"
        onMouseEnter={() => setHoveredCard(tourGuide.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() =>
          router.push(`/tour-guide/${tourGuide.slug || tourGuide.id}`)
        }
      >
        <div className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl">
          <div className="relative overflow-hidden">
            <img
              src={avatar}
              alt={tourGuide.name}
              className="w-full h-80 object-cover transition-transform duration-700"
              style={{ transform: isHovered ? "scale(1.12)" : "scale(1)" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(13, 115, 119, 0.92), transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                <i className="pi pi-user text-2xl text-white" />
                <h3 className="text-2xl font-bold text-white">
                  {tourGuide.name}
                </h3>
              </div>
            </div>

            {tourGuide.isAvailable ? (
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

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <i className="pi pi-briefcase text-2xl text-teal-700" />
              <p className="text-lg font-semibold">Hướng dẫn viên du lịch</p>
            </div>

            {tourGuide.shortBio && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {tourGuide.shortBio}
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
              {tourGuide.yearsOfExperience && (
                <div>
                  <p className="text-xs text-gray-500">Kinh nghiệm</p>
                  <p className="font-bold">{tourGuide.yearsOfExperience} năm</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Đánh giá</p>
                <div className="flex items-center justify-center">
                  <Rating
                    value={Number(tourGuide.averageRating) || 0}
                    readOnly
                    cancel={false}
                    className="text-xs"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tour</p>
                <p className="font-bold">
                  {tourGuide.totalToursCompleted || 0}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-6">
                {[
                  { icon: FacebookIcon, label: "Facebook" },
                  { icon: YoutubeIcon, label: "YouTube" },
                  { icon: ZaloIcon, label: "Zalo" },
                  { icon: TiktokIcon, label: "TikTok" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.stopPropagation()}
                    className="transition-transform hover:scale-110 active:scale-95"
                    aria-label={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-8 h-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (guideLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton height="40rem" className="rounded-3xl" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton height="3rem" className="mb-6" />
              <Skeleton height="20rem" className="mb-6" />
              <Skeleton height="15rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="pi pi-exclamation-circle text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">
            Không tìm thấy thông tin hướng dẫn viên
          </p>
        </div>
      </div>
    );
  }

  const avatar =
    guide.avatar?.[0]?.fileUrl ||
    "https://via.placeholder.com/400x500?text=HDV";
  const age = guide.birthday
    ? new Date().getFullYear() - new Date(guide.birthday).getFullYear()
    : null;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Profile Card */}
          <div className="lg:col-span-1">
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={avatar}
                  alt={guide.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {guide.isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                      <i className="pi pi-check-circle" />
                      Sẵn sàng
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                      <i className="pi pi-times-circle" />
                      Đang bận
                    </span>
                  )}
                </div>

                {/* Social Icons */}
                <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-3">
                  {[
                    { icon: FacebookIcon, label: "Facebook" },
                    { icon: YoutubeIcon, label: "YouTube" },
                    { icon: ZaloIcon, label: "Zalo" },
                    { icon: TiktokIcon, label: "TikTok" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg transition-all hover:scale-110 hover:bg-white/30"
                      aria-label={social.label}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="h-6 w-6"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative px-8 pb-8 pt-6 text-center">
                <h3 className="text-3xl font-bold">{guide.name}</h3>
                {guide.code && (
                  <p className="mt-1 text-sm text-gray-500">ID: {guide.code}</p>
                )}
                <p className="mt-2 text-xl font-semibold text-teal-600">
                  Hướng dẫn viên du lịch
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Rating
                    value={Number(guide.averageRating) || 0}
                    readOnly
                    cancel={false}
                  />
                  <span className="text-sm text-gray-600">
                    ({guide.totalReviews} đánh giá)
                  </span>
                </div>

                {(guide.bio || guide.shortBio) && (
                  <p className="mt-5 text-gray-600 leading-relaxed">
                    {guide.bio || guide.shortBio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right - Detail Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">
              Thông tin hướng dẫn viên{" "}
              <span className="text-teal-600">{guide.name}</span>
            </h2>

            <div className="rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  {age && (
                    <InfoItem
                      icon="pi-calendar"
                      label="Tuổi"
                      value={`${age} tuổi`}
                    />
                  )}
                  {guide.phone && (
                    <InfoItem
                      icon="pi-phone"
                      label="Điện thoại"
                      value={guide.phone}
                    />
                  )}
                  {guide.email && (
                    <InfoItem
                      icon="pi-envelope"
                      label="Email"
                      value={guide.email}
                    />
                  )}
                  {guide.nationality && (
                    <InfoItem
                      icon="pi-flag"
                      label="Quốc tịch"
                      value={guide.nationality}
                    />
                  )}
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  {guide.yearsOfExperience && (
                    <InfoItem
                      icon="pi-briefcase"
                      label="Kinh nghiệm"
                      value={`${guide.yearsOfExperience} năm`}
                    />
                  )}
                  {guide.address && (
                    <InfoItem
                      icon="pi-map-marker"
                      label="Địa chỉ"
                      value={guide.address}
                    />
                  )}
                  {guide.licenseNumber && (
                    <InfoItem
                      icon="pi-id-card"
                      label="Số giấy phép"
                      value={guide.licenseNumber}
                    />
                  )}
                  <InfoItem
                    icon="pi-check-circle"
                    label="Hoàn thành"
                    value={`${guide.totalToursCompleted} tour`}
                  />
                </div>
              </div>
            </div>

            {/* Languages */}
            {guide.languages && guide.languages.length > 0 && (
              <div className="rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <i className="pi pi-globe" />
                  Ngôn ngữ
                </h3>
                <div className="flex flex-wrap gap-3">
                  {guide?.languages?.map((lang: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specialties */}
            {guide.specialties && guide.specialties.length > 0 && (
              <div className="rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <i className="pi pi-star" />
                  Chuyên môn
                </h3>
                <ul className="space-y-3">
                  {guide?.specialties?.map((specialty: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <i className="pi pi-check-circle text-teal-500 text-xl" />
                      <span className="text-gray-700">{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* License Info */}
            {guide.licenseNumber && (
              <div className="rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <i className="pi pi-verified" />
                  Thông tin giấy phép
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    icon="pi-id-card"
                    label="Số giấy phép"
                    value={guide.licenseNumber}
                    noMb
                  />
                  {guide.licenseIssuedBy && (
                    <InfoItem
                      icon="pi-building"
                      label="Nơi cấp"
                      value={guide.licenseIssuedBy}
                      noMb
                    />
                  )}
                  {guide.licenseIssuedDate && (
                    <InfoItem
                      icon="pi-calendar"
                      label="Ngày cấp"
                      value={new Date(
                        guide.licenseIssuedDate,
                      ).toLocaleDateString("vi-VN")}
                      noMb
                    />
                  )}
                  {guide.licenseExpiryDate && (
                    <InfoItem
                      icon="pi-calendar-times"
                      label="Ngày hết hạn"
                      value={new Date(
                        guide.licenseExpiryDate,
                      ).toLocaleDateString("vi-VN")}
                      noMb
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Guides Carousel */}
        {!relatedLoading && relatedGuides.length > 0 && (
          <div className="mt-20 text-center">
            <Title>Gặp gỡ các Hướng dẫn viên khác</Title>
            <p className="text-center text-gray-600 mb-10">
              Khám phá thêm những người bạn đồng hành tuyệt vời cho hành trình
              của bạn
            </p>

            <Carousel
              value={relatedGuides}
              numVisible={4}
              numScroll={1}
              circular
              autoplayInterval={3500}
              itemTemplate={tourGuideTemplate}
              responsiveOptions={[
                { breakpoint: "1280px", numVisible: 4, numScroll: 1 },
                { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
                { breakpoint: "768px", numVisible: 2, numScroll: 1 },
                { breakpoint: "560px", numVisible: 1, numScroll: 1 },
              ]}
              className="tour-guide-carousel"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  noMb = false,
}: {
  icon: string;
  label: string;
  value: string | number;
  noMb?: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 ${!noMb ? "mb-3" : ""}`}>
      <div className="flex items-center gap-3 min-w-35">
        <i className={`pi ${icon} text-teal-600 text-xl`} />
        <span className="font-semibold ">{label}:</span>
      </div>
      <span className="flex-1">{value}</span>
    </div>
  );
}
