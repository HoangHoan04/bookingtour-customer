import { useEffect, useMemo, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import ShineButton from "@/components/ui/botton/ShineButton";
import { useLocation, useParams } from "react-router";
import { useTourBySlug } from "@/hooks/tour";
import GlobalLoading from "@/components/ui/loading";
import { formatDate } from "@/common/helpers/format";
import { formatPrice } from "@/common/helpers/formatPrice";
import type { TourPrice } from "@/dto/tour.dto";
import {
  useCreateBooking,
  type BookingDetail,
  type OrderInfo,
} from "@/hooks/booking";

const TOUR_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1532599238321-4b3602f9064c?q=80&w=2070&auto=format&fit=crop";

type TicketType = "ADULT" | "CHILD";

type BookingLocationState = {
  tourDetailId?: string;
  tourId?: string;
};

const getPriceByType = (prices: TourPrice[] | undefined, type: TicketType) => {
  return (prices || []).find(
    (price) => price.priceType?.toUpperCase() === type,
  );
};

const BookingInput = ({
  label,
  id,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  id: string;
  icon: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-teal-800 font-bold text-sm ml-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <i className={`pi ${icon}`}></i>
      </div>
      <InputText
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-full! py-3! pl-10! border-gray-200! focus:border-teal-500! focus:ring-0! hover:border-teal-400! text-sm! text-gray-600 shadow-sm"
      />
    </div>
  </div>
);

const PaymentMethodCard = ({
  value,
  selected,
  onChange,
  logo,
  label,
  subLabel,
}: {
  value: string;
  selected: string;
  onChange: (value: string) => void;
  logo: string;
  label: string;
  subLabel?: string;
}) => (
  <div
    onClick={() => onChange(value)}
    className={`
      flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
      ${selected === value ? "border-teal-600 bg-teal-50" : "border-gray-100 bg-white hover:border-teal-200"}
    `}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-8 flex items-center justify-center bg-white rounded border border-gray-100 p-1">
        <img src={logo} alt={label} className="h-full object-contain" />
      </div>
      <div>
        <h4 className="text-teal-900 font-bold text-sm">{label}</h4>
        {subLabel && <p className="text-gray-400 text-xs">{subLabel}</p>}
      </div>
    </div>
    <RadioButton
      inputId={value}
      name="payment"
      value={value}
      onChange={(e) => onChange(e.value)}
      checked={selected === value}
      className="ml-2"
      pt={{
        input: {
          className: selected === value ? "!bg-teal-600 !border-teal-600" : "",
        },
      }}
    />
  </div>
);

const TicketQuantityPicker = ({
  label,
  quantity,
  onDecrease,
  onIncrease,
  unitPrice,
}: {
  label: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  unitPrice: number;
}) => {
  return (
    <div className="rounded-2xl border border-teal-100 p-4 bg-[#F3FBFB]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-teal-800">{label}</p>
        <p className="text-sm font-semibold text-orange-500">
          {formatPrice(unitPrice)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          className="w-8 h-8 rounded-full border border-teal-200 text-teal-800 hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={quantity <= 0}
        >
          -
        </button>
        <span className="w-10 text-center font-bold text-teal-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-teal-200 text-teal-800 hover:bg-teal-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

const BookingSection = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [userOrderInfo, setUserOrderInfo] = useState({
    contactFullname: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    note: "",
  });
  const { tourDetailId } = (location.state || {}) as BookingLocationState;
  const { data: tourData, isLoading } = useTourBySlug(slug || undefined);

  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [agree, setAgree] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [childQuantity, setChildQuantity] = useState(0);

  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const selectedTourDetail = useMemo(() => {
    const details = tourData?.__tourDetails__ || [];
    return details.find((detail) => detail.id === tourDetailId) || details[0];
  }, [tourData, tourDetailId]);

  const adultPriceRow = getPriceByType(
    selectedTourDetail?.__tourPrice__,
    "ADULT",
  );
  const childPriceRow = getPriceByType(
    selectedTourDetail?.__tourPrice__,
    "CHILD",
  );

  const adultPrice = adultPriceRow?.price ?? 0;
  const childPrice = childPriceRow?.price ?? 0;
  const hasAdultTicket = !!adultPriceRow;
  const hasChildTicket = !!childPriceRow;

  useEffect(() => {
    if (!selectedTourDetail) return;

    setAdultQuantity(hasAdultTicket ? 1 : 0);
    setChildQuantity(0);
  }, [selectedTourDetail?.id, hasAdultTicket]);

  const adultTotal = adultQuantity * adultPrice;
  const childTotal = childQuantity * childPrice;
  const subtotal = adultTotal + childTotal;
  const tax = 0;
  const discount = 0;
  const total = subtotal + tax - discount;

  const handlePayment = async () => {
    let bookingDetails: BookingDetail[] = [];
    if (!agree) {
      alert("Bạn cần đồng ý với điều khoản và chính sách để tiếp tục.");
      return;
    }

    if (total <= 0) {
      alert("Vui lòng chọn ít nhất một vé để đặt tour.");
      return;
    }

    if (
      !userOrderInfo.contactFullname ||
      !userOrderInfo.contactEmail ||
      !userOrderInfo.contactPhone ||
      !userOrderInfo.contactAddress
    ) {
      alert("Vui lòng điền đầy đủ thông tin liên hệ.");
      return;
    }
    if (adultQuantity > 0) {
      bookingDetails.push({
        price: adultPrice,
        tourId: tourData?.id,
        tourDetailId: selectedTourDetail?.id,
        tourPriceId: adultPriceRow?.id,
        quantity: adultQuantity,
      });
    }
    if (childQuantity > 0) {
      bookingDetails.push({
        price: childPrice,
        tourId: tourData?.id,
        tourDetailId: selectedTourDetail?.id,
        tourPriceId: childPriceRow?.id,
        quantity: childQuantity,
      });
    }

    const orderData: OrderInfo = {
      contactFullname: userOrderInfo.contactFullname,
      contactEmail: userOrderInfo.contactEmail,
      contactPhone: userOrderInfo.contactPhone,
      contactAddress: userOrderInfo.contactAddress,
      note: userOrderInfo.note,
      totalPrice: total,
      bookingDetails,
    };
    try {
      const bookingResult: any = await createBooking(orderData);

      const paymentUrl = bookingResult?.paymentUrl;

      if (typeof paymentUrl === "string" && paymentUrl.trim()) {
        window.location.assign(paymentUrl);
      }
    } catch {
      alert("Không thể tạo đơn đặt tour. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return <GlobalLoading />;
  }

  if (!tourData || !selectedTourDetail) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-teal-800 mb-3">
          Không tìm thấy tour
        </h2>
        <p className="text-sm text-gray-500">
          Không thể tải thông tin tour để đặt chỗ. Vui lòng quay lại và thử lại.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                1
              </span>
              Chọn Số Lượng Vé
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {hasAdultTicket ? (
                <TicketQuantityPicker
                  label="Vé Người Lớn"
                  quantity={adultQuantity}
                  unitPrice={adultPrice}
                  onDecrease={() =>
                    setAdultQuantity((prev) => Math.max(0, prev - 1))
                  }
                  onIncrease={() => setAdultQuantity((prev) => prev + 1)}
                />
              ) : null}

              {hasChildTicket ? (
                <TicketQuantityPicker
                  label="Vé Trẻ Em"
                  quantity={childQuantity}
                  unitPrice={childPrice}
                  onDecrease={() =>
                    setChildQuantity((prev) => Math.max(0, prev - 1))
                  }
                  onIncrease={() => setChildQuantity((prev) => prev + 1)}
                />
              ) : null}
            </div>

            {!hasAdultTicket && !hasChildTicket ? (
              <p className="text-sm text-gray-500">
                Đợt tour này chưa có dữ liệu giá vé.
              </p>
            ) : null}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                2
              </span>
              Thông Tin Liên Hệ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <BookingInput
                id="contactFullname"
                label="Họ và tên"
                icon="pi-user"
                placeholder="Le"
                value={userOrderInfo.contactFullname}
                onChange={(e) =>
                  setUserOrderInfo({
                    ...userOrderInfo,
                    contactFullname: e.target.value,
                  })
                }
              />
              <BookingInput
                id="contactEmail"
                label="Địa Chỉ Email"
                icon="pi-envelope"
                placeholder="admin@example.com"
                type="email"
                value={userOrderInfo.contactEmail}
                onChange={(e) =>
                  setUserOrderInfo({
                    ...userOrderInfo,
                    contactEmail: e.target.value,
                  })
                }
              />
              <BookingInput
                id="contactPhone"
                label="Số Điện Thoại"
                icon="pi-phone"
                placeholder="+84 999 999 999"
                type="tel"
                value={userOrderInfo.contactPhone}
                onChange={(e) =>
                  setUserOrderInfo({
                    ...userOrderInfo,
                    contactPhone: e.target.value,
                  })
                }
              />
              <BookingInput
                id="contactAddress"
                label="Địa Chỉ"
                icon="pi-map-marker"
                placeholder="123 Đường ABC, Quận XYZ, TP. HCM"
                value={userOrderInfo.contactAddress}
                onChange={(e) =>
                  setUserOrderInfo({
                    ...userOrderInfo,
                    contactAddress: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                3
              </span>
              Thông Tin Khách Hàng
            </h2>
            <div className="bg-[#fffbf2] p-4 rounded-2xl mb-4 border border-orange-100">
              <p className="text-sm text-gray-600 mb-2">
                Guest 1 ({hasAdultTicket ? "Adult" : "Traveler"}) -{" "}
                <span className="font-bold text-teal-700">Lead Traveler</span>
              </p>
              <div className="text-xs text-gray-400">
                Same as contact information
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="text-teal-800 font-bold text-sm ml-2">
                Ghi Chú Đặc Biệt (Nếu Có)
              </label>
              <InputTextarea
                rows={4}
                placeholder="Có gì cần lưu ý cho chuyến đi không?"
                value={userOrderInfo.note}
                onChange={(e) =>
                  setUserOrderInfo({
                    ...userOrderInfo,
                    note: e.target.value,
                  })
                }
                className="w-full rounded-2xl! p-4! border-gray-200! focus:border-teal-500! hover:border-teal-400! text-sm"
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                4
              </span>
              Phương Thức Thanh Toán
            </h2>

            <div className="space-y-4">
              <PaymentMethodCard
                value="vnpay"
                selected={paymentMethod}
                onChange={setPaymentMethod}
                label="VNPAY QR / ATM Card"
                subLabel="Pay securely via VNPAY Gateway"
                logo="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg"
              />

              <PaymentMethodCard
                value="momo"
                selected={paymentMethod}
                onChange={setPaymentMethod}
                label="Momo E-Wallet"
                subLabel="Fast & Convenient"
                logo="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
              />
            </div>

            <div className="mt-6 flex items-start gap-3 ml-1">
              <Checkbox
                inputId="terms"
                checked={agree}
                onChange={(e) => setAgree(e.checked || false)}
                pt={{
                  box: {
                    className: agree ? "!bg-teal-600 !border-teal-600" : "",
                  },
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-500 cursor-pointer select-none"
              >
                I agree to the{" "}
                <span className="text-teal-700 font-bold hover:underline">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-teal-700 font-bold hover:underline">
                  Privacy Policy
                </span>
                .
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-6">
            <h3 className="text-lg font-bold text-teal-900 mb-4">
              Tổng Quan Đặt Tour
            </h3>

            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
              <img
                src={TOUR_FALLBACK_IMAGE}
                alt="Tour"
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-orange-500 mb-1">
                  {tourData.durations}
                </div>
                <h4 className="text-sm font-bold text-teal-800 line-clamp-2 leading-snug">
                  {tourData.title}
                </h4>
                <div className="text-xs text-gray-400 mt-1">
                  <i className="pi pi-calendar mr-1"></i>
                  {formatDate(selectedTourDetail.startDay)} -{" "}
                  {formatDate(selectedTourDetail.endDay)}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {hasAdultTicket ? (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Người lớn (x{adultQuantity})</span>
                  <span className="font-bold">{formatPrice(adultTotal)}</span>
                </div>
              ) : null}
              {hasChildTicket ? (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Trẻ em (x{childQuantity})</span>
                  <span className="font-bold">{formatPrice(childTotal)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax & Service Charge</span>
                <span className="font-bold">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-bold">-{formatPrice(discount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200 mb-2">
              <span className="text-teal-900 font-bold text-lg">Tổng cộng</span>
              <span className="text-2xl font-extrabold text-orange-500">
                {formatPrice(total)}
              </span>
            </div>

            <div className="mt-4">
              <ShineButton
                label={`Thanh toán ${formatPrice(total)}`}
                icon={
                  <i className="pi pi-arrow-right relative z-10 text-sm font-bold"></i>
                }
                handleClick={() => handlePayment()}
                loading={isPending}
              />
            </div>

            <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <i className="pi pi-lock text-2xl"></i>
              <i className="pi pi-verified text-2xl"></i>
              <i className="pi pi-shield text-2xl"></i>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
              Secure Payment Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
