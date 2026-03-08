import {
  useDestinationBySlug,
  useIncrementDestinationView,
} from "@/hooks/destination";
import { useRouter } from "@/routes/hooks/use-router";
import { PUBLIC_ROUTES } from "@/routes/routes";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DestinationDetailScreen() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: destination, isLoading } = useDestinationBySlug(slug);
  const { incrementView } = useIncrementDestinationView();

  useEffect(() => {
    if (destination?.id) {
      incrementView(destination.id);
    }
  }, [destination.id, incrementView]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton width="100%" height="28rem" className="mb-0" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton width="60%" height="3rem" />
              <Skeleton width="100%" height="12rem" />
              <Skeleton width="100%" height="8rem" />
            </div>
            <div>
              <Skeleton width="100%" height="24rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <i className="pi pi-map-marker text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy điểm đến</h2>
          <p className="text-gray-600 mb-6">
            Điểm đến bạn tìm kiếm không tồn tại hoặc đã bị xóa
          </p>
          <Button
            label="Quay lại trang chủ"
            icon="pi pi-home"
            onClick={() => router.push(PUBLIC_ROUTES.HOME)}
            className="bg-teal-600 border-teal-600"
          />
        </div>
      </div>
    );
  }

  const imageUrl =
    destination.image?.fileUrl ||
    "https://via.placeholder.com/1200x400?text=Destination";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[32rem] overflow-hidden">
        <Image
          src={imageUrl}
          alt={destination.name}
          className="w-full h-full"
          imageClassName="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <i className="pi pi-map-marker text-xl"></i>
              <span className="text-lg font-medium">
                {destination.region}, {destination.country}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {destination.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="pi pi-eye"></i>
                <span>{destination.viewCount} lượt xem</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="pi pi-compass"></i>
                <span>{destination.touringCount} tours</span>
              </div>
              {destination.status === "NEW" && (
                <Tag value="Mới" severity="success" icon="pi pi-sparkles" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="shadow-lg rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <i className="pi pi-info-circle text-teal-600 text-2xl"></i>
                <h2 className="text-3xl font-bold">
                  Tổng quan về {destination.name}
                </h2>
              </div>
              <Divider />
              <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                {destination.description}
              </div>
            </div>

            {/* Useful Information */}
            {(destination.bestTimeToVisit ||
              destination.averageTemperature ||
              destination.latitude ||
              destination.popularActivities) && (
              <div className="shadow-lg rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="pi pi-calendar text-teal-600 text-2xl"></i>
                  <h2 className="text-3xl font-bold">Thông tin hữu ích</h2>
                </div>
                <Divider />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.bestTimeToVisit && (
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-100 p-4 rounded-xl">
                        <i className="pi pi-calendar-plus text-teal-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Thời gian lý tưởng
                        </p>
                        <p className="font-bold text-gray-900 text-lg">
                          Tháng {destination.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  )}

                  {destination.averageTemperature && (
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-4 rounded-xl">
                        <i className="pi pi-sun text-orange-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Nhiệt độ trung bình
                        </p>
                        <p className="font-bold text-gray-900 text-lg">
                          {destination.averageTemperature}°C
                        </p>
                      </div>
                    </div>
                  )}

                  {destination.latitude && destination.longitude && (
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-4 rounded-xl">
                        <i className="pi pi-map text-green-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tọa độ</p>
                        <p className="font-bold text-gray-900">
                          {destination.latitude}, {destination.longitude}
                        </p>
                      </div>
                    </div>
                  )}

                  {destination.rating > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 p-4 rounded-xl">
                        <i className="pi pi-star-fill text-yellow-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Đánh giá</p>
                        <p className="font-bold text-gray-900 text-lg">
                          {destination.rating}/5
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {destination.popularActivities &&
                  destination.popularActivities.length > 0 && (
                    <>
                      <Divider />
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <i className="pi pi-th-large text-teal-600"></i>
                          Hoạt động phổ biến
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {destination.popularActivities.map(
                            (activity: string, index: number) => (
                              <Chip
                                key={index}
                                label={activity}
                                icon="pi pi-check"
                                className="bg-teal-100 text-teal-700 px-4 py-2 text-base"
                              />
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}
              </div>
            )}

            {/* Tours Section */}
            <div className="shadow-lg rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <i className="pi pi-compass text-teal-600 text-2xl"></i>
                  <h2 className="text-3xl font-bold">
                    Tours tại {destination.name}
                  </h2>
                </div>
                <Chip
                  label={`${destination.touringCount} tours`}
                  className="bg-teal-100 text-teal-700 font-bold px-4 py-2"
                />
              </div>
              <Divider />
              {destination.touringCount > 0 ? (
                <div className="text-center py-12">
                  <i className="pi pi-compass text-6xl text-gray-300 mb-6"></i>
                  <p className="text-gray-600 mb-6 text-lg">
                    Có {destination.touringCount} tours khả dụng tại điểm đến
                    này
                  </p>
                  <Button
                    label="Xem tất cả tours"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className="bg-teal-600 border-teal-600 px-6 py-3"
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="pi pi-info-circle text-6xl text-gray-300 mb-6"></i>
                  <p className="text-gray-600 text-lg">
                    Hiện chưa có tour nào tại điểm đến này
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="pi pi-info-circle text-teal-600"></i>
                Thông tin nhanh
              </h3>
              <Divider />
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600 flex items-center gap-2">
                    <i className="pi pi-map-marker"></i>
                    Quốc gia
                  </span>
                  <span className="font-semibold">{destination.country}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600 flex items-center gap-2">
                    <i className="pi pi-globe"></i>
                    Vùng/Miền
                  </span>
                  <span className="font-semibold">{destination.region}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600 flex items-center gap-2">
                    <i className="pi pi-hashtag"></i>
                    Mã điểm đến
                  </span>
                  <span className="font-semibold">{destination.code}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 flex items-center gap-2">
                    <i className="pi pi-chart-line"></i>
                    Trạng thái
                  </span>
                  <Tag
                    value={destination.status}
                    severity={destination.status === "NEW" ? "success" : "info"}
                  />
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="shadow-lg rounded-2xl p-8 bg-linear-to-br from-teal-600 to-teal-700 text-white">
              <div className="text-center">
                <i className="pi pi-compass text-5xl mb-4 opacity-90"></i>
                <h3 className="text-2xl font-bold mb-3">Sẵn sàng khám phá?</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Tìm kiếm và đặt tour du lịch đến {destination.name} ngay hôm
                  nay!
                </p>
                <Button
                  label="Tìm tour ngay"
                  icon="pi pi-search"
                  className="w-full bg-white text-teal-600 border-white hover:bg-teal-50 font-bold py-3"
                  onClick={() => router.push(PUBLIC_ROUTES.TOUR_GUIDE)}
                />
              </div>
            </div>

            {/* Share Card */}
            <div className="shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="pi pi-share-alt text-teal-600"></i>
                Chia sẻ điểm đến
              </h3>
              <Divider />
              <div className="flex gap-3">
                <Button
                  icon="pi pi-facebook"
                  className="bg-blue-600 border-blue-600 flex-1"
                  tooltip="Facebook"
                  tooltipOptions={{ position: "bottom" }}
                />
                <Button
                  icon="pi pi-twitter"
                  className="bg-sky-500 border-sky-500 flex-1"
                  tooltip="Twitter"
                  tooltipOptions={{ position: "bottom" }}
                />
                <Button
                  icon="pi pi-link"
                  className="bg-gray-600 border-gray-600 flex-1"
                  tooltip="Copy link"
                  tooltipOptions={{ position: "bottom" }}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-3">
                Khám phá thêm điểm đến khác
              </h2>
              <p className="text-teal-100 text-lg">
                Tìm hiểu về những địa điểm tuyệt vời khác trên khắp thế giới
              </p>
            </div>
            <Button
              label="Xem tất cả điểm đến"
              icon="pi pi-arrow-right"
              iconPos="right"
              className="bg-white text-teal-600 border-white hover:bg-teal-50 font-bold px-8 py-4 text-lg whitespace-nowrap"
              onClick={() => router.push(PUBLIC_ROUTES.DESTINATIONS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
