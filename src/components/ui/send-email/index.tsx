import { InputText } from "primereact/inputtext";
import React from "react";
import { useToast } from "../../../context/ToastContext";
import { useSubscribeNewsletter } from "../../../hooks/newsletter";

interface SendEmailComponentProps {
  title?: string;
  description?: string;
  placeholder?: string;
  onSuccess?: (email: string) => void;
  onError?: (error: any) => void;
  bgColor?: string;
  buttonColor?: string;
}

export default function SendEmailComponent({
  title = "Đăng ký nhận tin tức mỗi ngày",
  description = "Đăng ký nhận bản tin hàng tuần để cập nhật những thông tin mới nhất.",
  placeholder = "Nhập email của bạn...",
  onSuccess,
  onError,
  bgColor = "#fb923c",
  buttonColor = "#0f766e",
}: SendEmailComponentProps) {
  const [email, setEmail] = React.useState("");
  const { showToast } = useToast();
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast({
        type: "warn",
        title: "Cảnh báo",
        message: "Vui lòng nhập email",
      });
      return;
    }

    if (!validateEmail(email)) {
      showToast({
        type: "error",
        title: "Lỗi",
        message: "Email không hợp lệ",
      });
      return;
    }

    subscribe(email, {
      onSuccess: (data) => {
        showToast({
          type: "success",
          title: "Thành công",
          message: data.message || "Đăng ký nhận tin thành công!",
        });
        setEmail("");
        onSuccess?.(email);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại!";
        showToast({
          type: "error",
          title: "Lỗi",
          message: errorMessage,
        });
        onError?.(error);
      },
    });
  };

  return (
    <section className="py-12 px-6" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
        <div className="flex-1 min-w-75">
          <h2 className="text-white font-bold mb-2">
            <span
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                fontWeight: 700,
                color: "white",
                position: "relative",
                display: "inline-block",
              }}
            >
              {title}
            </span>
          </h2>
          <p className="text-teal-700 text-sm font-medium">{description}</p>
        </div>

        <div className="flex-1 min-w-70 max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                disabled={isPending}
                className="w-full px-6 py-5 pr-24 rounded-full shadow-xl border-box focus:outline-none focus:ring-0 transition-all duration-300"
                style={{
                  fontSize: "1.1rem",
                  height: "70px",
                  borderRadius: "9999px",
                  border: `5px solid ${buttonColor}`,
                  backgroundColor: "#fff7ed",
                  paddingLeft: "20px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = buttonColor;
                  e.target.style.backgroundColor = "#dbeeee";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = buttonColor;
                  e.target.style.backgroundColor = "#ffffff";
                }}
              />
              <button
                type="submit"
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: buttonColor,
                }}
              >
                {isPending ? (
                  <i className="pi pi-spin pi-spinner text-white text-xl"></i>
                ) : (
                  <i className="pi pi-send text-white text-xl"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
          @import url("https://fonts.googleapis.com/css2?family=Brush+Script+MT&display=swap");

          .font-handwriting {
            font-family: "Brush Script MT", cursive;
            font-style: italic;
          }
        `}</style>
    </section>
  );
}
