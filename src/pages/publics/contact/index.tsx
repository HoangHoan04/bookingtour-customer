import { earth } from "@/assets/animations";
import Lottie from "lottie-react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);

  const subjects = [
    { label: "Câu hỏi chung", value: "general" },
    { label: "Đặt tour", value: "booking" },
    { label: "Hỗ trợ", value: "support" },
    { label: "Phản hồi", value: "feedback" },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  };

  return (
    <div className="min-h-screen pb-8 px-2">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl mb-8">
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3216830969253!2d106.69522331533422!3d10.786834992313928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb3ff69197b10ec4f!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col justify-center items-center p-6">
            <div className="relative w-full max-w-md">
              <Lottie
                animationData={earth}
                loop={true}
                autoplay={true}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid meet",
                }}
              />
            </div>
          </div>

          <div>
            <Card className="shadow-xl">
              <h2 className="text-3xl font-bold mb-6">
                <span className="">Liên hệ cho chúng tôi </span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <Dropdown
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.value })
                    }
                    options={subjects}
                    placeholder="Chọn chủ đề"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <InputTextarea
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    inputId="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.checked || false)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    Tôi xác nhận không phải là robot
                  </label>
                </div>

                <Button
                  label="Gửi Tin Nhắn"
                  icon="pi pi-send"
                  onClick={handleSubmit}
                  className="w-full"
                  raised
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    fontSize: "1.1rem",
                    padding: "0.75rem",
                  }}
                />
              </div>
            </Card>
          </div>
        </div>

        <Card
          className="text-center shadow-xl"
          style={{
            borderRadius: "1.5rem",
          }}
        >
          <h3 className="text-4xl font-bold mb-3" style={{ color: "white" }}>
            Sẵn sàng cho cuộc phiêu lưu tiếp theo của bạn?
          </h3>
          <p
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: "#e0e7ff" }}
          >
            Nhận ưu đãi độc quyền và khuyến mãi đặc biệt khi đặt tour ngay hôm
            nay!
          </p>
          <Button
            label="Khám Phá Tour Ngay"
            icon="pi pi-compass"
            className="px-6 py-3"
            raised
            style={{
              backgroundColor: "white",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "600",
            }}
          />
        </Card>
      </div>
    </div>
  );
}
