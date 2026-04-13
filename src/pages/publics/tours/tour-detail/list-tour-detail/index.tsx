import { formatDate } from "@/common/helpers/format";
import { formatPrice } from "@/common/helpers/formatPrice";
import ShineButton from "@/components/ui/botton/ShineButton";
import type { TourDetail, TourDto, TourPrice } from "@/dto/tour.dto";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useTheme } from "@/context/ThemeContext";

type TourDetailPageState = {
  tour?: TourDto;
};

const getStatusStyle = (status?: string) => {
  const value = status?.toLowerCase() || "";

  if (value.includes("open") || value.includes("active")) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (value.includes("full") || value.includes("closed")) {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-amber-100 text-amber-700";
};

const sortByStartDate = (a: TourDetail, b: TourDetail) => {
  const aTime = new Date(a.startDay || "").getTime();
  const bTime = new Date(b.startDay || "").getTime();

  if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
  return aTime - bTime;
};

const sortPriceByType = (a: TourPrice, b: TourPrice) => {
  return a.priceType.localeCompare(b.priceType);
};

const TourPriceRow = ({
  price,
  isDark,
}: {
  price: TourPrice;
  isDark: boolean;
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 rounded-2xl border p-4 ${
        isDark ? "border-slate-700 bg-slate-800" : "border-teal-100 bg-white"
      }`}
    >
      <div>
        <p
          className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
        >
          Loại giá
        </p>
        <p
          className={`text-sm mt-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          {price.priceType == "ADULT"
            ? "Người lớn"
            : price.priceType == "CHILD"
              ? "Trẻ em"
              : "-"}
        </p>
      </div>

      <div>
        <p
          className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
        >
          Mức giá
        </p>
        <p className="text-base font-bold text-orange-500 mt-1">
          {formatPrice(price.price ?? 0)}
        </p>
      </div>

      <div>
        <p
          className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
        >
          Tiền tệ
        </p>
        <p
          className={`text-sm mt-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          {price.currency || "VND"}
        </p>
      </div>
    </div>
  );
};

const TourDetailBlock = ({
  detail,
  isFocused,
  currentTour,
  isDark,
}: {
  detail: TourDetail;
  isFocused: boolean;
  currentTour: TourDto;
  isDark: boolean;
}) => {
  const prices = [...(detail.__tourPrice__ || [])].sort(sortPriceByType);
  const navigate = useNavigate();

  return (
    <article
      className={`rounded-3xl border p-6 md:p-8 shadow-sm transition ${
        isFocused
          ? isDark
            ? "bg-slate-800 border-teal-700 shadow-lg"
            : "bg-white border-teal-200 shadow-lg"
          : isDark
            ? "bg-slate-800/90 border-slate-700"
            : "bg-white/90 border-slate-200"
      }`}
    >
      <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
        <div>
          <h3
            className={`text-xl font-extrabold ${isDark ? "text-teal-300" : "text-teal-900"}`}
          >
            Đợt tour {detail.code || "---"}
          </h3>
          <p
            className={`text-sm mt-1 ${isDark ? "text-slate-300" : "text-slate-500"}`}
          >
            {formatDate(detail.startDay)} - {formatDate(detail.endDay)}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyle(
            detail.status,
          )}`}
        >
          {detail.status || "Đang cập nhật"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div
          className={`rounded-2xl p-4 border ${
            isDark
              ? "bg-slate-900 border-slate-700"
              : "bg-[#F3FBFB] border-teal-100"
          }`}
        >
          <p
            className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
          >
            Điểm khởi hành
          </p>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {detail.startLocation || "Đang cập nhật"}
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 border ${
            isDark
              ? "bg-slate-900 border-slate-700"
              : "bg-[#F3FBFB] border-teal-100"
          }`}
        >
          <p
            className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
          >
            Sức chứa
          </p>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {detail.capacity ?? 0} chỗ
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 border ${
            isDark
              ? "bg-slate-900 border-slate-700"
              : "bg-[#F3FBFB] border-teal-100"
          }`}
        >
          <p
            className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
          >
            Chỗ còn lại
          </p>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            {detail.remainingSeats ?? 0} chỗ
          </p>
        </div>
      </div>

      <div>
        <h4
          className={`text-base font-bold mb-3 ${isDark ? "text-teal-300" : "text-teal-800"}`}
        >
          Chi tiết giá
        </h4>
        {prices.length === 0 ? (
          <p
            className={`rounded-2xl border border-dashed p-4 text-sm ${
              isDark
                ? "border-slate-600 bg-slate-900 text-slate-300"
                : "border-slate-300 bg-slate-50 text-slate-500"
            }`}
          >
            Chưa có dữ liệu giá cho đợt tour này.
          </p>
        ) : (
          <div className="space-y-3">
            {prices.map((price) => (
              <TourPriceRow key={price.id} price={price} isDark={isDark} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-6">
        <ShineButton
          label="BOOK NOW"
          handleClick={() =>
            navigate(`/tours/booking/${currentTour.slug}`, {
              state: { tourDetailId: detail.id, tourId: currentTour.id },
            })
          }
        />
      </div>
    </article>
  );
};

const AllTourDetailAndPrice = () => {
  const { detailId } = useParams();
  const location = useLocation();
  const state = location.state as TourDetailPageState | null;
  const tour = state?.tour;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tourDetails = [...(tour?.__tourDetails__ || [])].sort(sortByStartDate);
  const focusedIndex = tourDetails.findIndex((item) => item.id === detailId);

  const orderedDetails =
    focusedIndex > 0
      ? [
          tourDetails[focusedIndex],
          ...tourDetails.filter((_, idx) => idx !== focusedIndex),
        ]
      : tourDetails;

  const totalPriceRows = orderedDetails.reduce(
    (count, detail) => count + (detail.__tourPrice__?.length || 0),
    0,
  );

  if (!tour) {
    return (
      <div
        className={`min-h-screen py-20 px-4 ${isDark ? "bg-[#111827]" : "bg-[#EFFFFF]"}`}
      >
        <div
          className={`max-w-4xl mx-auto rounded-3xl border p-8 md:p-10 text-center shadow-sm ${
            isDark
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-white"
          }`}
        >
          <h1
            className={`text-2xl font-extrabold mb-3 ${isDark ? "text-teal-300" : "text-teal-900"}`}
          >
            Không tìm thấy dữ liệu tour
          </h1>
          <p className={`mb-6 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
            Vui lòng quay lại danh sách tour và bấm Xem mọi giá để mở đúng thông
            tin.
          </p>
          <Link
            to="/tours"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#066168] text-white font-semibold hover:bg-[#044f55] transition"
          >
            Quay lại trang tour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-16 px-4 ${isDark ? "bg-[#111827]" : "bg-[#EFFFFF]"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`rounded-4xl border p-6 md:p-10 shadow-lg ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-teal-100"
          }`}
        >
          <div
            className={`flex flex-wrap items-start justify-between gap-5 pb-6 border-b ${
              isDark ? "border-slate-700" : "border-slate-100"
            }`}
          >
            <div>
              <p
                className={`text-xs uppercase tracking-[0.2em] font-semibold ${
                  isDark ? "text-teal-300" : "text-teal-700"
                }`}
              >
                THÔNG TIN TOUR
              </p>
              <h1
                className={`text-3xl md:text-4xl font-bold mt-2 ${isDark ? "text-teal-300" : "text-teal-900"}`}
              >
                {tour.title}
              </h1>
              <p
                className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-500"}`}
              >
                {tour.location} • {tour.durations}
              </p>
            </div>

            <Link
              to={`/tours/${tour.slug}`}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition ${
                isDark
                  ? "border-teal-700 text-teal-300 hover:bg-slate-700"
                  : "border-teal-200 text-teal-800 hover:bg-teal-50"
              }`}
            >
              <i className="pi pi-arrow-left"></i>
              Quay lại chi tiết tour
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "bg-orange-950/30 border-orange-900"
                  : "bg-[#FFF7E8] border-orange-200"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold">
                Tổng số đợt tour
              </p>
              <p className="text-2xl font-extrabold text-orange-500 mt-1">
                {orderedDetails.length}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-[#F3FBFB] border-teal-100"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-wide font-semibold ${isDark ? "text-teal-300" : "text-teal-700"}`}
              >
                Tổng số dòng giá
              </p>
              <p
                className={`text-2xl font-extrabold mt-1 ${isDark ? "text-teal-300" : "text-teal-800"}`}
              >
                {totalPriceRows}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "bg-indigo-950/25 border-indigo-900"
                  : "bg-[#F8F7FF] border-indigo-100"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">
                Đánh giá
              </p>
              <p className="text-2xl font-extrabold text-indigo-700 mt-1">
                {tour.rating} / 5
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {orderedDetails.length === 0 ? (
              <p
                className={`rounded-2xl border border-dashed p-5 text-sm ${
                  isDark
                    ? "border-slate-600 bg-slate-900 text-slate-300"
                    : "border-slate-300 bg-slate-50 text-slate-500"
                }`}
              >
                Tour này chưa có đợt tour chi tiết để hiển thị.
              </p>
            ) : (
              orderedDetails.map((detail) => (
                <TourDetailBlock
                  key={detail.id}
                  detail={detail}
                  isFocused={detail.id === detailId}
                  currentTour={tour}
                  isDark={isDark}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTourDetailAndPrice;
