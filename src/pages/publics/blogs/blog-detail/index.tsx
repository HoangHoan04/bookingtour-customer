import LabelTag from "@/components/ui/LabelTag";
import Title from "@/components/ui/Tilte";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Tag } from "primereact/tag";
import React, { useState } from "react";

export default function BlogDetailScreen() {
  const [filter, setFilter] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Email submitted:", filter);
  };

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

  const handleSubmitSendBlog = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  };

  const destinations = [
    { name: "Thailand", listings: "24 Listings" },
    { name: "Maldives", listings: "21 Listings" },
    { name: "Bangkok", listings: "( 88 Listings )" },
    { name: "Paris", listings: "( 34 Listings )" },
    { name: "Spain", listings: "( 16 Listings )" },
  ];

  const gallery = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    },
  ];

  const tags = [
    "Real",
    "Hotel",
    "Sky fear",
    "Really",
    "Adventure",
    "Travel",
    "Luxury",
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-center mb-6">
              <Title>Tiêu đề của blog</Title>
            </div>

            <Divider />
            {/* Featured Image */}
            <div className="relative mb-6">
              <Image
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop"
                alt="Thailand Beach"
                className="w-full"
                imageClassName={`w-full h-96 object-cover transition-transform duration-500 rounded-2xl`}
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-user"></i>
                <span>Tên người đăng</span>
              </span>
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-calendar"></i>
                <span>20-08-2025</span>
              </span>
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-tag"></i>
                <span>Tour, Travel</span>
              </span>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none mb-8">
              <p className=" leading-relaxed mb-4">
                Choosing a destination can be exciting, but after a bit
                overwhelming with so many amazing places out there! Let's narrow
                it. Travel is a multi-award-winning strategy and content
                creation agency that specializes in destination marketing and
                creative publicity at all levels, social influencer ranges set,
                travel blog search and paid (SEM) with our unique and exclusive
                network. travel brands, filming luxury...
              </p>

              <p className=" leading-relaxed mb-4">
                Here's a rounded overview of top travel destinations and what
                makes each one special, perfect for your next adventure or web
                content inspiration. Tropical beaches, natural wonders, ancient
                ruins travel budget. nightlife adventure. Mountainous national
                parks and forests, waterfalls, Japan (Destinations), resort
                cities, safaris, urban city breaks, mountain hikes. Thailand,
                Dubai, Paris or Los Angeles, Iceland, Japan, Rome, Maldives or
                pink culture, street food crusts, Hong Kong, New Zealand More
                places, wines, scenic drive.
              </p>

              {/* Quote Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                <i className="pi pi-quote-left text-4xl text-blue-500 mb-3 block"></i>
                <p className="text-gray-800 italic mb-4">
                  "Why do you go away? So that you can come back. So that you
                  can see the place you came from with new eyes and extra
                  colors. And the people there see you differently, too. Coming
                  back to where you started is not the same as never leaving."
                </p>
                <p className="font-semibold ">— Terry Pratchett</p>
              </div>

              <p className=" leading-relaxed mb-6">
                Choosing a destination can be exciting but after a bit
                overwhelming with so many amazing places out there! Let's narrow
                it down. Travel is a multi-award-winning strategy and content
                creation agency that specializes in destination marketing and
                creative publicity at all levels, social influencer ranges set,
                travel blog search and paid (SEM) with our unique and exclusive
                network. travel brands, filming luxury (More consequat) nisl
                consecrate, porttitor.For at venal, social da influor parni
                ogmen dec est ut our blog. Set a impossible contact amet. Our ta
                not represent duis sets dic.
              </p>

              {/* Two Column Images */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <Image
                  src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop"
                  alt="Woman in yellow dress"
                  imageClassName={`w-full object-cover transition-transform duration-500 rounded-2xl`}
                />
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=300&fit=crop"
                  alt="Woman by water"
                  imageClassName={`w-full object-cover transition-transform duration-500 rounded-2xl`}
                />
              </div>

              <h2 className="text-2xl font-bold  mt-8 mb-4">
                International Tourists Arriving in Spain, Portugal, Greece,
                Italy, France Rose at Huge Rate, Now Over Tourism...
              </h2>

              <p className=" leading-relaxed mb-6">
                Choosing a destination can be exciting but after a bit
                overwhelming with so many amazing places out there! Let's narrow
                it Travel is a multi-award-winning strategy and content creation
                agency that specializes in destination marketing and creative
                publicity at all levels, social influencer ranges set. travel
                branded, More consequat nisl consecrate, porttitor.por at venal,
                social da influor parni ogmen dec est ut our blog. Set a
                impossible contact amet. Our to not represent duis settle dic.
                Our to not represent duis settle dic.
              </p>

              <h3 className="text-xl font-bold  mb-4">
                What precautions should be take while travelling?
              </h3>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3 ">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <i className="pi pi-check text-white text-xs"></i>
                  </div>
                  <span>Stay aware of your kids and locations</span>
                </li>
                <li className="flex items-center gap-3 ">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <i className="pi pi-check text-white text-xs"></i>
                  </div>
                  <span>Keep copies of important documents</span>
                </li>
                <li className="flex items-center gap-3 ">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <i className="pi pi-check text-white text-xs"></i>
                  </div>
                  <span>Stay hydrated and eat safely</span>
                </li>
                <li className="flex items-center gap-3 ">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <i className="pi pi-check text-white text-xs"></i>
                  </div>
                  <span>Download Offline maps and translation apps</span>
                </li>
              </ul>
            </div>

            {/* Tags and Social */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold ">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  icon="pi pi-facebook"
                  rounded
                  text
                  className="w-10 h-10 bg-blue-600 text-white"
                />
                <Button
                  icon="pi pi-twitter"
                  rounded
                  text
                  className="w-10 h-10 bg-blue-400 text-white"
                />
                <Button
                  icon="pi pi-instagram"
                  rounded
                  text
                  className="w-10 h-10 bg-pink-600 text-white"
                />
                <Button
                  icon="pi pi-youtube"
                  rounded
                  text
                  className="w-10 h-10 bg-red-600 text-white"
                />
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mb-8">
              <LabelTag>Đánh giá của khách hàng</LabelTag>
              <div className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <div className="flex gap-4">
                    <Avatar
                      image="https://i.pravatar.cc/150?img=1"
                      size="large"
                      shape="circle"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold ">Charlie</h4>
                          <p className="text-sm text-gray-500">18-07-2025</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                          Reply
                        </span>
                      </div>
                      <p className="">
                        Exciting and Alive old Conservating with so many amazing
                        places out there! Alive old Viewer I viewer I came a
                        multi media amazing strategs and the destination to
                        large generally.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 shadow-sm">
                  <div className="flex gap-4">
                    <Avatar
                      image="https://i.pravatar.cc/150?img=2"
                      size="large"
                      shape="circle"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold ">George</h4>
                          <p className="text-sm text-gray-500">24-07-2025</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                          Reply
                        </span>
                      </div>
                      <p className="">
                        So many amazing places out there! Left i came a i came
                        is South amazing promising strategy and section viewers.
                        Hail is destination to multi.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Comment Section */}
            <div className="rounded-lg p-6">
              <LabelTag>Comment Section</LabelTag>
              <p className="mb-6">
                We love to hear from you, our friendly team is always here to
                chat
              </p>

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
                    onClick={handleSubmitSendBlog}
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search box */}
            <div className="flex-1 min-w-70 max-w-2xl">
              <div className="relative">
                <InputText
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full px-6 py-3 pr-24 rounded-full shadow-xl border-box focus:outline-none focus:ring-0 transition-all duration-300"
                  style={{
                    fontSize: "1.1rem",
                    height: "50px",
                    borderRadius: "9999px",
                    border: "5px solid #0f766e",
                    backgroundColor: "#fff7ed",
                    paddingLeft: "20px",
                    color: "#334155",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ffaa0d";
                    e.target.style.backgroundColor = "#0f766e";
                    e.target.style.color = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ffaa0d";
                    e.target.style.backgroundColor = "#fff7ed";
                    e.target.style.color = "#334155";
                  }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-teal-700 hover:bg-teal-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-lg"
                  style={{
                    backgroundColor: "#ffaa0d",
                  }}
                >
                  <i className="pi pi-search text-white text-xs"></i>
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Bài viết gần đây</LabelTag>
              <Card className="mb-6 border-0 shadow-sm">
                <div className="space-y-6">
                  {[
                    {
                      date: "14",
                      month: "June",
                      author: "Aidan Butler",
                      title:
                        "Resources for your first trip to overseas vacation",
                    },
                    {
                      date: "20",
                      month: "June",
                      author: "Ricardo Bell",
                      title:
                        "How to get acquainted with natives in a strange land",
                    },
                    {
                      date: "24",
                      month: "June",
                      author: "Martin Hicks",
                      title:
                        "Step by step guide to planning your ideal holiday",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex gap-4">
                        <div className="bg-teal-700 rounded-lg px-3 py-2 flex flex-col items-center justify-center shrink-0 w-16 h-16">
                          <div className="text-white text-2xl font-bold leading-none">
                            {item.date}
                          </div>
                          <div className="text-white text-sm">{item.month}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-orange-500 font-semibold mb-2">
                            {item.author}
                          </h4>
                          <p className="text-teal-700 text-lg font-semibold leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      {index < 2 && (
                        <hr className="border-dashed border-gray-300 mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Top Destinations */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Điểm đến hàng đầu</LabelTag>
              <Card className="mb-6 border-0 shadow-sm">
                <div className="space-y-6">
                  {destinations.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center gap-4">
                        <h4 className="text-orange-500 font-semibold mb-2">
                          {item.name}
                        </h4>
                        <p className="text-teal-700 text-lg font-semibold leading-snug">
                          {item.listings}
                        </p>
                      </div>
                      {index < destinations.length - 1 && (
                        <hr className="border-dashed border-gray-300 mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Gallery */}
            <div className="mb-6 border-0 shadow-sm mt-8">
              <LabelTag>Thư viện ảnh</LabelTag>
              <div className="border-0 shadow-sm p-0">
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((item, index) => (
                    <div key={index}>
                      <Image
                        src={item.image}
                        alt="Gallery Image"
                        className="w-full"
                        imageClassName={`w-full h-32 object-cover transition-transform duration-500 rounded-2xl p-0`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
