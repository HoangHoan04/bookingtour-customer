import ShineButton from "@/components/ui/botton/ShineButton";
import "primeicons/primeicons.css";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";

const tourSummary = {
  title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
  image:
    "https://images.unsplash.com/photo-1532599238321-4b3602f9064c?q=80&w=2070&auto=format&fit=crop",
  date: "20 Feb 2026 - 22 Feb 2026",
  duration: "3 Ngày 2 Đêm",
  guests: 2,
  pricePerPerson: 250,
  tax: 15,
  discount: 10,
};

const BookingInput = ({ label, id, icon, placeholder, type = "text" }: any) => (
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
}: any) => (
  <div
    onClick={() => onChange(value)}
    className={`
      flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
      ${selected === value ? "border-teal-600 bg-teal-50" : "border-gray-100 bg-white hover:border-teal-200"}
    `}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-8 flex items-center justify-center bg-white rounded border border-gray-100 p-1">
        {/* Logo Placeholder */}
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

const BookingSection = () => {
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [agree, setAgree] = useState(false);

  const subtotal = tourSummary.pricePerPerson * tourSummary.guests;
  const total = subtotal + tourSummary.tax - tourSummary.discount;

  return (
    <div className="min-h-screen  font-sans py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: INPUT FORMS --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Contact Details */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                1
              </span>
              Thông Tin Liên Hệ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <BookingInput
                id="firstName"
                label="Họ"
                icon="pi-user"
                placeholder="Le"
              />
              <BookingInput
                id="lastName"
                label="Tên đệm + Tên"
                icon="pi-user"
                placeholder="Văn Trung"
              />
              <BookingInput
                id="email"
                label="Địa Chỉ Email"
                icon="pi-envelope"
                placeholder="admin@example.com"
                type="email"
              />
              <BookingInput
                id="phone"
                label="Số Điện Thoại"
                icon="pi-phone"
                placeholder="+84 999 999 999"
                type="tel"
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                2
              </span>
              Thông Tin Khách Hàng
            </h2>
            <div className="bg-[#fffbf2] p-4 rounded-2xl mb-4 border border-orange-100">
              <p className="text-sm text-gray-600 mb-2">
                Guest 1 (Adult) -{" "}
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
                className="w-full rounded-2xl! p-4! border-gray-200! focus:border-teal-500! hover:border-teal-400! text-sm"
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                3
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
                value="card"
                selected={paymentMethod}
                onChange={setPaymentMethod}
                label="Credit / Debit Card"
                subLabel="Visa, Mastercard, JCB"
                logo="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              />

              <PaymentMethodCard
                value="momo"
                selected={paymentMethod}
                onChange={setPaymentMethod}
                label="Momo E-Wallet"
                subLabel="Fast & Convenient"
                logo="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
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
                src={tourSummary.image}
                alt="Tour"
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-orange-500 mb-1">
                  {tourSummary.duration}
                </div>
                <h4 className="text-sm font-bold text-teal-800 line-clamp-2 leading-snug">
                  {tourSummary.title}
                </h4>
                <div className="text-xs text-gray-400 mt-1">
                  <i className="pi pi-calendar mr-1"></i>
                  {tourSummary.date}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Adult (x{tourSummary.guests})</span>
                <span className="font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax & Service Charge</span>
                <span className="font-bold">${tourSummary.tax}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-bold">-${tourSummary.discount}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200 mb-2">
              <span className="text-teal-900 font-bold text-lg">Total Pay</span>
              <span className="text-2xl font-extrabold text-orange-500">
                ${total}
              </span>
            </div>

            <div className="mt-4">
              <ShineButton
                label={`Pay $${total} Now`}
                icon={
                  <i className="pi pi-arrow-right relative z-10 text-sm font-bold"></i>
                }
              />
            </div>

            {/* Trust Badges */}
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
