import { formatDate } from "@/common/helpers/format";
import { formatPrice } from "@/common/helpers/formatPrice";
import ShineButton from "@/components/ui/botton/ShineButton";
import type { TourDetail, TourDto, TourPrice } from "@/dto/tour.dto";
import { Link, useLocation, useNavigate, useParams } from "react-router";

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

const TourPriceRow = ({ price }: { price: TourPrice }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 rounded-2xl border border-teal-100 bg-white p-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
          Loại giá
        </p>
        <p className="text-sm text-slate-700 mt-1">
          {price.priceType == "ADULT"
            ? "Người lớn"
            : price.priceType == "CHILD"
              ? "Trẻ em"
              : "-"}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
          Mức giá
        </p>
        <p className="text-base font-bold text-orange-500 mt-1">
          {formatPrice(price.price ?? 0)}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
          Tiền tệ
        </p>
        <p className="text-sm text-slate-700 mt-1">{price.currency || "VND"}</p>
      </div>
    </div>
  );
};

const TourDetailBlock = ({
  detail,
  isFocused,
  currentTour,
}: {
  detail: TourDetail;
  isFocused: boolean;
  currentTour: TourDto;
}) => {
  const prices = [...(detail.__tourPrice__ || [])].sort(sortPriceByType);
  const navigate = useNavigate();

  return (
    <article
      className={`rounded-3xl border p-6 md:p-8 shadow-sm transition ${
        isFocused
          ? "bg-white border-teal-200 shadow-lg"
          : "bg-white/90 border-slate-200"
      }`}
    >
      <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-extrabold text-teal-900">
            Đợt tour {detail.code || "---"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
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
        <div className="rounded-2xl bg-[#F3FBFB] p-4 border border-teal-100">
          <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
            Điểm khởi hành
          </p>
          <p className="text-sm font-medium text-slate-700 mt-1">
            {detail.startLocation || "Đang cập nhật"}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F3FBFB] p-4 border border-teal-100">
          <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
            Sức chứa
          </p>
          <p className="text-sm font-medium text-slate-700 mt-1">
            {detail.capacity ?? 0} chỗ
          </p>
        </div>

        <div className="rounded-2xl bg-[#F3FBFB] p-4 border border-teal-100">
          <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
            Chỗ còn lại
          </p>
          <p className="text-sm font-medium text-slate-700 mt-1">
            {detail.remainingSeats ?? 0} chỗ
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-base font-bold text-teal-800 mb-3">Chi tiết giá</h4>
        {prices.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
            Chưa có dữ liệu giá cho đợt tour này.
          </p>
        ) : (
          <div className="space-y-3">
            {prices.map((price) => (
              <TourPriceRow key={price.id} price={price} />
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
      <div className="bg-[#EFFFFF] min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 md:p-10 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-teal-900 mb-3">
            Không tìm thấy dữ liệu tour
          </h1>
          <p className="text-slate-500 mb-6">
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
    <div className="bg-[#EFFFFF] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-4xl bg-white border border-teal-100 p-6 md:p-10 shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-5 pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-teal-700 font-semibold">
                THÔNG TIN TOUR
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-teal-900 mt-2 leading-tight">
                {tour.title}
              </h1>
              <p className="text-slate-500 mt-2">
                {tour.location} • {tour.durations}
              </p>
            </div>

            <Link
              to={`/tours/${tour.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-teal-200 px-5 py-2.5 text-teal-800 font-semibold hover:bg-teal-50 transition"
            >
              <i className="pi pi-arrow-left"></i>
              Quay lại chi tiết tour
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[#FFF7E8] border border-orange-200 p-4">
              <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold">
                Tổng số đợt tour
              </p>
              <p className="text-2xl font-extrabold text-orange-500 mt-1">
                {orderedDetails.length}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F3FBFB] border border-teal-100 p-4">
              <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
                Tổng số dòng giá
              </p>
              <p className="text-2xl font-extrabold text-teal-800 mt-1">
                {totalPriceRows}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F7FF] border border-indigo-100 p-4">
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
              <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                Tour này chưa có đợt tour chi tiết để hiển thị.
              </p>
            ) : (
              orderedDetails.map((detail) => (
                <TourDetailBlock
                  key={detail.id}
                  detail={detail}
                  isFocused={detail.id === detailId}
                  currentTour={tour}
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
