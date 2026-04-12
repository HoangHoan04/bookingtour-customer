import React, { useState, useRef } from "react";

import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";

import ShineButton from "@/components/ui/botton/ShineButton";
import { Calendar } from "primereact/calendar";
import { useTheme } from "@/context/ThemeContext";

type InputGroupProps = {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  type?: "text" | "date" | "time";
  children?: React.ReactNode;
  isDark?: boolean;
};

const iconStyle = { fontSize: 24 };

interface SectionTitleProps {
  title: string;
  isDark?: boolean;
}
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  isDark = false,
}) => (
  <div
    className={`relative flex items-center px-4 py-2 mb-4 rounded-r-md ${
      isDark ? "bg-slate-800/80" : "bg-gray-100/80"
    }`}
  >
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400 h-full"></div>
    <h3
      className={`${isDark ? "text-slate-100" : "text-teal-800"} font-bold text-lg ml-2`}
    >
      {title}
    </h3>
  </div>
);

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  icon,
  type = "text",
  children,
  isDark = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (type !== "text" && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.showPicker?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        cursor-pointer border rounded-full
        px-5 py-2.5 flex flex-col justify-center
        transition-colors input-group
        ${
          isDark
            ? "border-slate-600 bg-gray-800/80 hover:border-teal-400"
            : "border-gray-200 bg-white hover:border-teal-500"
        }
      `}
    >
      <label
        className={`${isDark ? "text-slate-100" : "text-teal-800"} font-bold text-sm mb-0.5`}
      >
        {label}
      </label>

      <div className="flex items-center justify-between gap-2">
        {children ? (
          children
        ) : type === "text" ? (
          <span
            className={`${isDark ? "text-slate-300" : "text-gray-500"} text-sm`}
          >
            {value}
          </span>
        ) : (
          <input
            ref={inputRef}
            type={type}
            defaultValue={value}
            className={`
              text-sm w-full outline-none
              bg-transparent p-0 appearance-none
              ${isDark ? "text-slate-300" : "text-gray-500"}
            `}
          />
        )}

        {icon && (type === "text" || type === "date" || type === "time") && (
          <span
            className={`${
              isDark
                ? "text-slate-400 group-hover:text-teal-300"
                : "text-gray-400 group-hover:text-teal-500"
            } p-2`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

const SearchSidebar = () => {
  const [travelers, setTravelers] = useState(1);
  const [duration, setDuration] = useState<number>(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const locations = [
    { name: "Đà Lạt", code: "DL" },
    { name: "Đà Nẵng", code: "DN" },
    { name: "Sapa", code: "SP" },
    { name: "Hà Nội", code: "HN" },
    { name: "Huế", code: "HUE" },
  ];

  const activityTypes = [
    { name: "Du lịch trải nghiệm", code: "TN" },
    { name: "Mạo hiểm", code: "MH" },
    { name: "Sa mạc", code: "SM" },
    { name: "Văn hóa", code: "VH" },
  ];

  return (
    <div
      className={`w-full max-w-sm ${
        isDark
          ? "bg-gray-800 border-gray-600 text-slate-100"
          : "bg-white border-gray-100 text-gray-900"
      } p-6 rounded-3xl shadow-xl border font-sans`}
    >
      <div className="space-y-4 mb-8">
        <div className="cursor-pointer">
          <InputGroup label="Location" value="New Zealand" isDark={isDark}>
            <Dropdown
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.value)}
              options={locations}
              optionLabel="name"
              placeholder="Chọn Địa Điểm"
              className="w-full"
            />
          </InputGroup>
        </div>

        <div className="cursor-pointer">
          <InputGroup label="Activity Type" value="Adventure" isDark={isDark}>
            <Dropdown
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.value)}
              options={activityTypes}
              optionLabel="name"
              placeholder="Chọn Loại Hoạt Động"
              className="w-full"
            />
          </InputGroup>
        </div>

        <InputGroup
          label="Date"
          value="2023-11-06"
          type="date"
          isDark={isDark}
          icon={<i className="pi pi-calendar"></i>}
        >
          <Calendar
            className="calendar-no-border input-date"
            placeholder="Chọn ngày"
            value={selectDate}
            onChange={(e) => setSelectDate(e.value || null)}
          />
        </InputGroup>

        <InputGroup
          label="Time"
          value="13:45"
          type="time"
          isDark={isDark}
          icon={<i className="pi pi-clock"></i>}
        >
          <Calendar
            className="calendar-no-border input-date"
            placeholder="Chọn giờ"
            value={selectDate}
            onChange={(e) => setSelectDate(e.value || null)}
            timeOnly
            hourFormat="24"
          />
        </InputGroup>

        <div
          className={`border rounded-full px-5 py-2.5 flex items-center justify-between ${
            isDark
              ? "border-slate-600 bg-slate-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <label
              className={`${isDark ? "text-slate-100" : "text-teal-800"} font-bold text-sm block`}
            >
              Traveler
            </label>
            <span
              className={`${isDark ? "text-slate-200" : "text-teal-800"} font-bold text-sm`}
            >
              {travelers}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTravelers(Math.max(1, travelers - 1))}
              className={`w-6 h-6 flex items-center justify-center hover:cursor-pointer ${
                isDark
                  ? "text-slate-400 hover:text-teal-300"
                  : "text-gray-400 hover:text-teal-600"
              }`}
            >
              <i className="pi pi-minus" style={{ fontSize: 12 }}></i>
            </button>
            <button
              onClick={() => setTravelers(travelers + 1)}
              className={`w-6 h-6 flex items-center justify-center hover:cursor-pointer ${
                isDark
                  ? "text-slate-400 hover:text-teal-300"
                  : "text-gray-400 hover:text-teal-600"
              }`}
            >
              <i className="pi pi-plus" style={{ fontSize: 12 }}></i>
            </button>
          </div>
        </div>
        <button className="w-full bg-teal-800 text-white rounded-full py-3 flex items-center justify-center hover:bg-teal-900 transition-colors shadow-lg shadow-teal-900/20 hover:cursor-pointer">
          <i className="pi pi-search mr-2 w-6" style={iconStyle}></i>
        </button>
      </div>

      <Divider />

      <div className="mb-8">
        <SectionTitle title="Cities" isDark={isDark} />

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search ..."
            className={`w-full border rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none ${
              isDark
                ? "border-slate-600 bg-slate-800 text-slate-200 focus:border-teal-300"
                : "border-gray-200 bg-white text-gray-700 focus:border-teal-500"
            }`}
          />
          <i
            className={`pi pi-search absolute right-4 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-400" : "text-gray-400"
            }`}
          ></i>
        </div>

        <div className="space-y-3 pl-1">
          {locations.map((location) => (
            <label
              key={location.code}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className={`w-5 h-5 border-2 rounded checked:bg-teal-600 checked:border-teal-600 focus:ring-0 cursor-pointer accent-teal-600 ${
                  isDark ? "border-slate-500" : "border-gray-200"
                }`}
              />
              <span
                className={`${
                  isDark
                    ? "text-slate-200 group-hover:text-teal-300"
                    : "text-teal-800 group-hover:text-teal-600"
                } font-medium text-sm`}
              >
                {location.name}
              </span>
            </label>
          ))}
        </div>

        <button
          className={`${isDark ? "text-teal-300" : "text-teal-700"} font-bold text-sm mt-4 hover:underline`}
        >
          Show More...
        </button>
      </div>

      <Divider />

      <div className="mb-8">
        <SectionTitle title="Duration (in Nights)" isDark={isDark} />

        <div className="px-2">
          <Slider
            value={duration}
            onChange={(e) =>
              setDuration(typeof e.value === "number" ? e.value : e.value[0])
            }
          />
          <div
            className={`flex justify-between mt-2 text-sm font-medium ${
              isDark ? "text-slate-300" : "text-gray-600"
            }`}
          >
            <span>1 Night</span>
            <span>{(duration / 10).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="mb-8">
        <SectionTitle title="Type of Theme" isDark={isDark} />
        <div className="space-y-3 pl-1">
          {["Du lịch trải nghiệm", "Mạo hiểm", "Sa mạc", "Văn hóa"].map(
            (themeType) => (
              <label
                key={themeType}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className={`w-5 h-5 border-2 rounded checked:bg-teal-600 checked:border-teal-600 focus:ring-0 cursor-pointer accent-teal-600 ${
                    isDark ? "border-slate-500" : "border-gray-200"
                  }`}
                />
                <span
                  className={`${
                    isDark
                      ? "text-slate-200 group-hover:text-teal-300"
                      : "text-teal-800 group-hover:text-teal-600"
                  } font-medium text-sm`}
                >
                  {themeType}
                </span>
              </label>
            ),
          )}
        </div>
        <button
          className={`${isDark ? "text-teal-300" : "text-teal-700"} font-bold text-sm mt-4 hover:underline`}
        >
          Show More...
        </button>
      </div>

      <Divider />

      <div>
        <SectionTitle title="Hotel Rating" isDark={isDark} />
        <div className="space-y-3 pl-1">
          {[
            { stars: 5, count: 150 },
            { stars: 4, count: 2850 },
          ].map((rating, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={`w-5 h-5 border-2 rounded checked:bg-teal-600 checked:border-teal-600 accent-teal-600 ${
                  isDark ? "border-slate-500" : "border-gray-200"
                }`}
              />
              <div className="flex items-center gap-1">
                <span
                  className={`${isDark ? "text-slate-100" : "text-teal-800"} font-bold text-sm w-3`}
                >
                  {rating.stars}
                </span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`pi pi-star ${
                        i < rating.stars
                          ? ""
                          : isDark
                            ? "text-slate-600"
                            : "text-gray-300"
                      }`}
                      style={{ fontSize: 14 }}
                    ></i>
                  ))}
                </div>
                <span
                  className={`${isDark ? "text-slate-400" : "text-gray-400"} text-xs ml-1`}
                >
                  ({rating.count}) Review
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Divider />

      <div className="mx-auto my-4">
        <ShineButton />
      </div>

      <div>
        <img
          src="https://travlla.dexignzone.com/tailwind/demo/assets/images/Advertisment.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SearchSidebar;
