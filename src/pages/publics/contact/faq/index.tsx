import { earth } from "@/assets/animations";
import { faqMedia } from "@/assets/images";
import SendEmailComponent from "@/components/ui/send-email";
import Title from "@/components/ui/Tilte";
import Lottie from "lottie-react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export default function FaqScreen() {
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

  const handleSubmitFaq = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  };

  const faqItems = [
    {
      question: "Do you offer group discounts?",
      answer:
        "Yes, we offer special group discounts for parties of 10 or more. Contact us for detailed pricing and availability.",
    },
    {
      question: "How do I make changes to my booking?",
      answer:
        "You can make changes to your booking through your account dashboard or by contacting our support team directly.",
    },
    {
      question: "Are flights included in the package price?",
      answer:
        "Flight inclusion depends on the package you choose. Check the package details or contact us for specific information.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Our cancellation policy varies by package. Generally, cancellations made 30+ days before departure receive a full refund.",
    },
    {
      question: "What's included in my travel package?",
      answer:
        "Travel packages typically include accommodation, select meals, guided tours, and transportation as specified in the package details.",
    },
    {
      question: "How far in advance should I book my trip?",
      answer:
        "We recommend booking at least 2-3 months in advance for the best availability and rates, especially during peak seasons.",
    },
    {
      question: "Can I book only accommodations through your site?",
      answer:
        "Yes, you can book accommodations separately without purchasing a full package. Browse our accommodation options.",
    },
    {
      question: "How can I contact support during my trip?",
      answer:
        "Our 24/7 support team is available via phone, email, and live chat throughout your journey for any assistance you need.",
    },
  ];

  return (
    <div className="">
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* FAQ Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Text and Image */}
            <div className="space-y-8 lg:sticky lg:top-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-linear-to-r from-teal-100 to-cyan-100 rounded-full">
                  <span className="text-teal-700 font-semibold text-sm tracking-wide">
                    CÂU HỎI THƯỜNG GẶP
                  </span>
                </div>
                <Title>
                  Tìm câu trả lời cho những câu hỏi bạn đang thắc mắc.
                </Title>
              </div>

              <p className="text-gray-600 text-base leading-relaxed">
                HimLamTourist là một công ty chuyên về chiến lược và sáng tạo
                nội dung, từng đoạt nhiều giải thưởng, chuyên về tiếp thị du
                lịch.
              </p>

              <div className="relative mt-12 flex justify-center items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-teal-400 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <Image
                    src={faqMedia}
                    alt="Travel consultant"
                    className="relative object-cover w-72 rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-300"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-5/6 bg-linear-to-r from-yellow-50 to-amber-50 px-6 py-5 rounded-2xl shadow-xl flex items-center gap-4 border-2 border-white backdrop-blur-sm">
                  <div className="bg-teal-600 p-3 rounded-xl">
                    <i className="pi pi-comments text-2xl text-white"></i>
                  </div>
                  <span className="text-teal-800 font-semibold text-sm">
                    Give us a chance to help you!
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - FAQ Accordion */}
            <div className="space-y-3">
              <Accordion className="border-0">
                {faqItems.map((item, index) => (
                  <AccordionTab
                    key={index}
                    header={
                      <div className="flex items-center gap-3 py-1">
                        <span className="shrink-0 w-8 h-8 flex items-center justify-center font-bold text-sm shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold  hover:text-teal-600 transition-colors">
                          {item.question}
                        </span>
                      </div>
                    }
                    className="mb-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <p className=" leading-relaxed pl-11 pr-4 pb-2">
                      {item.answer}
                    </p>
                  </AccordionTab>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 border-t border-gray-200">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
              <div className="bg-linear-to-br from-purple-600 via-indigo-600 to-purple-700 text-white p-8 -m-6 mb-6">
                <h2 className="text-3xl font-bold mb-2">
                  Liên hệ với chúng tôi
                </h2>
                <p className="text-purple-100 text-sm">
                  Gửi tin nhắn và chúng tôi sẽ phản hồi sớm nhất
                </p>
              </div>

              <div className="space-y-5 px-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Chủ đề
                  </label>
                  <Dropdown
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.value })
                    }
                    options={subjects}
                    placeholder="Chọn chủ đề"
                    className="w-full rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <InputTextarea
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl">
                  <Checkbox
                    inputId="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.checked || false)}
                    className="border-gray-400"
                  />
                  <label htmlFor="agree" className="text-sm font-medium">
                    Tôi xác nhận không phải là robot
                  </label>
                </div>

                <Button
                  label="Gửi Tin Nhắn"
                  icon="pi pi-send"
                  onClick={handleSubmitFaq}
                  className="w-full rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  raised
                  style={{
                    border: "none",
                    fontSize: "1.1rem",
                    padding: "0.875rem",
                  }}
                />
              </div>
            </Card>
          </div>

          {/* Right Side - Animation */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
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
        </div>
      </div>

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
