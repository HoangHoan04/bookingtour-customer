import { formatDate } from "@/common/helpers/format";
import ShineButton from "@/components/ui/botton/ShineButton";
import type { TourDto } from "@/dto/tour.dto";
import { Carousel } from "primereact/carousel";
import { Galleria } from "primereact/galleria";
import { ScrollPanel } from "primereact/scrollpanel";
import { Timeline } from "primereact/timeline";
import {
  IncludeItem,
  InfoItem,
  customizedContent,
  customizedMarker,
  imageTemplate,
  itemTemplate,
  thumbnailTemplate,
} from "./custom";

import { Divider } from "primereact/divider";
import { Rating } from "primereact/rating";

import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/common/helpers/formatPrice";
import { useTheme } from "@/context/ThemeContext";

const TourDetailSection = ({ tour }: { tour: TourDto }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tourDetail = tour.__tourDetails__?.[0];
  const images = [
    "https://travlla.dexignzone.com/tailwind/demo/assets/images/detail-slider/slide2/pic1.jpg",
    "https://travlla.dexignzone.com/tailwind/demo/assets/images/detail-slider/slide2/pic2.jpg",
    "https://travlla.dexignzone.com/tailwind/demo/assets/images/detail-slider/slide2/pic3.jpg",
    "https://travlla.dexignzone.com/tailwind/demo/assets/images/detail-slider/slide2/pic4.jpg",
    "https://travlla.dexignzone.com/tailwind/demo/assets/images/detail-slider/slide2/pic5.jpg",
  ];

  const imagesGalleria = [
    {
      itemImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg",
      thumbnailImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
      itemImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria2.jpg",
      thumbnailImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria2s.jpg",
      alt: "Description for Image 2",
      title: "Title 2",
    },
    {
      itemImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg",
      thumbnailImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg",
      alt: "Description for Image 3",
      title: "Title 3",
    },
    {
      itemImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria4.jpg",
      thumbnailImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria4s.jpg",
      alt: "Description for Image 4",
      title: "Title 4",
    },
    {
      itemImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria5.jpg",
      thumbnailImageSrc:
        "https://primefaces.org/cdn/primereact/images/galleria/galleria5s.jpg",
      alt: "Description for Image 5",
      title: "Title 5",
    },
  ];

  const coureselResponsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const galleriaResponsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const inclusions: { label: string; included: boolean }[] = [];

  tour.included
    ?.split(" - ")
    .forEach((item) => inclusions.push({ label: item, included: true }));
  tour.excluded
    ?.split(" - ")
    .forEach((item) => inclusions.push({ label: item, included: false }));

  const scheduleData = [
    {
      day: "01",
      title: "Mount Batur",
      desc: "Mount Batur is an active volcano located in the heart of Bali, Indonesia, known for its stunning sunrise treks and breathtaking panoramic views. Rising to 1,717 meters above sea level.",
    },
    {
      day: "02",
      title: "Uluwatu Temple",
      desc: "Bali, Indonesia, known for its stunning sunrise treks and breathtaking panoramic views. Rising to 1,717 meters above sea level, it offers adventurous travelers a moderately challenging hike.",
    },
    {
      day: "03",
      title: "Kelingking Beach",
      desc: "Rising to 1,717 meters above sea level, it offers adventurous travelers a moderately challenging hike that rewards.",
    },
  ];

  return (
    <ScrollPanel style={{ height: "2000px" }}>
      <div
        className={`w-full p-6 rounded-3xl shadow-xl border font-sans ${
          isDark
            ? "bg-slate-800 border-slate-700 text-slate-100"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between pb-6 mb-6 gap-6 w-full border-b ${
            isDark ? "border-slate-700" : "border-gray-100"
          }`}
        >
          <div className="flex justify-between w-full">
            <div className="flex gap-6">
              <InfoItem
                label="Địa điểm"
                value={tour.location}
                isDark={isDark}
              />
              <InfoItem
                label="Loại hoạt động"
                value={tour?.category ?? ""}
                isDark={isDark}
              />
              <InfoItem
                label="Ngày"
                value={formatDate(tourDetail?.startDay)}
                isDark={isDark}
              />
              <InfoItem
                label="Người đi"
                value={
                  tourDetail?.capacity ? `${tourDetail.capacity} người` : ""
                }
                isDark={isDark}
              />
              <InfoItem
                label="Giá "
                value=""
                isDark={isDark}
                sub={`${formatPrice(tour.__tourDetails__?.[0]?.__tourPrice__?.[0]?.price ?? 0) || "0.00"}`}
              />
            </div>
            <ShineButton
              label="Xem mọi giá"
              handleClick={() =>
                navigate(`/tours-details/${tour.id}/all-prices`, {
                  state: { tour },
                })
              }
            />
          </div>
          <Divider type="solid" />
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-500"}`}
              >
                ({tour.rating} đánh giá)
              </span>

              <div className="flex gap-1 text-orange-400">
                <Rating value={5} readOnly cancel={false} />
              </div>
            </div>

            <h1
              className={`text-3xl md:text-4xl font-extrabold mb-4 leading-tight ${
                isDark ? "text-teal-300" : "text-teal-900"
              }`}
            >
              {tour.title}
            </h1>

            <p
              className={`text-sm md:text-base leading-relaxed mb-8 text-justify ${
                isDark ? "text-slate-300" : "text-gray-500"
              }`}
            >
              {tour.longDescription}
            </p>
          </div>

          <div className="mb-6">
            <Carousel
              value={images}
              numVisible={1}
              numScroll={1}
              className="custom-carousel"
              circular
              autoplayInterval={3000}
              responsiveOptions={coureselResponsiveOptions}
              itemTemplate={imageTemplate}
            />
          </div>

          <div className="gap-8">
            <div className="md:col-span-1">
              <h2
                className={`text-xl font-bold mb-3 flex items-center gap-2 ${
                  isDark ? "text-teal-300" : "text-teal-800"
                }`}
              >
                Ngắn gọn
              </h2>
              <p
                className={`text-sm leading-relaxed text-justify ${
                  isDark ? "text-slate-300" : "text-gray-500"
                }`}
              >
                {tour.shortDescription} Vùng núi cao với khí hậu ôn đới, mát mẻ
                quanh năm.
              </p>
            </div>
          </div>
          <div className="mt-8 w-full ">
            <div
              className={`md:col-span-2 p-6 rounded-2xl border ${
                isDark
                  ? "bg-slate-900/60 border-slate-700"
                  : "bg-[#fffbf2] border-[#faeec7]"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  isDark ? "text-teal-300" : "text-teal-800"
                }`}
              >
                Điểm nổi bật
              </h2>

              <div className="space-y-4">
                <div>
                  <h3
                    className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                      isDark ? "text-teal-300" : "text-teal-700"
                    }`}
                  >
                    <i className="pi pi-compass text-orange-400"></i>
                    Adventure & Nature:
                  </h3>
                  <ul
                    className={`space-y-2 text-sm pl-6 ${isDark ? "text-slate-300" : "text-gray-500"}`}
                  >
                    {tour.highlights
                      ? tour.highlights?.split(" - ").map((item, idx) => (
                          <li
                            key={idx}
                            className={`relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${
                              isDark
                                ? "before:bg-teal-400"
                                : "before:bg-teal-600"
                            }`}
                          >
                            {item}
                          </li>
                        ))
                      : "Chưa có thông tin này"}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-10">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Bao gồm & Không bao gồm
            </h2>

            <div
              className={`rounded-3xl p-8 ${
                isDark
                  ? "bg-slate-900/60 border border-slate-700"
                  : "bg-[#fffbf2]"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
                <div>
                  {inclusions
                    .filter((i) => i.included)
                    .map((item, idx) => (
                      <IncludeItem
                        key={idx}
                        label={item.label}
                        included={true}
                      />
                    ))}
                </div>

                <div>
                  {inclusions
                    .filter((i) => !i.included)
                    .map((item, idx) => (
                      <IncludeItem
                        key={idx}
                        label={item.label}
                        included={false}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Lịch trình tour
            </h2>

            <div
              className={`rounded-3xl p-8 md:p-10 ${
                isDark
                  ? "bg-slate-900/60 border border-slate-700"
                  : "bg-[#fffbf2]"
              }`}
            >
              <Timeline
                value={scheduleData}
                align="alternate"
                marker={customizedMarker}
                content={customizedContent}
                className="custom-timeline"
                pt={{
                  connector: { className: "bg-orange-300 w-[2px]" },
                }}
              />
            </div>
          </div>

          <div className="mb-10 w-full">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Video
            </h2>
            <div className="relative w-full h-80 rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop"
                alt="Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg backdrop-blur-sm animate-pulse">
                  <i className="pi pi-play-circle text-4xl text-teal-600"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 w-full">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Thư viện ảnh
            </h2>
            <Galleria
              value={imagesGalleria}
              responsiveOptions={galleriaResponsiveOptions}
              numVisible={5}
              circular
              style={{ maxWidth: "100%", maxHeight: "400px", height: "300px" }}
              showItemNavigators
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>

          <div className="mt-10 w-full">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Vị trí
            </h2>
            <div className="w-full h-80 rounded-3xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3216830969253!2d106.69522331533422!3d10.786834992313928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb3ff69197b10ec4f!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="my-10 w-full">
            <h2
              className={`text-xl font-bold mb-6 ${isDark ? "text-teal-300" : "text-teal-800"}`}
            >
              Tags
            </h2>
            {/* <div className="flex flex-wrap gap-2">
              {tour.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </ScrollPanel>
  );
};

export default TourDetailSection;
