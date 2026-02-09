import React, { useState, useRef } from "react";

import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";

import ShineButton from "@/components/ui/botton/ShineButton";
import { Calendar } from "primereact/calendar";

type InputGroupProps = {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  type?: "text" | "date" | "time";
  children?: React.ReactNode;
};

const iconStyle = { fontSize: 24 };

interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <div className="relative flex items-center bg-gray-100/80 px-4 py-2 mb-4 rounded-r-md">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400 h-full"></div>
    <h3 className="text-teal-800 font-bold text-lg ml-2">{title}</h3>
  </div>
);

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  icon,
  type = "text",
  children,
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
      className="
        cursor-pointer border border-gray-200 rounded-full
        px-5 py-2.5 flex flex-col justify-center
        bg-white hover:border-teal-500 transition-colors input-group
      "
    >
      <label className="text-teal-800 font-bold text-sm mb-0.5">{label}</label>

      <div className="flex items-center justify-between gap-2">
        {children ? (
          children
        ) : type === "text" ? (
          <span className="text-gray-500 text-sm">{value}</span>
        ) : (
          <input
            ref={inputRef}
            type={type}
            defaultValue={value}
            className="
              text-gray-500 text-sm w-full outline-none
              bg-transparent p-0 appearance-none
            "
          />
        )}

        {icon && (type === "text" || type === "date" || type === "time") && (
          <span className="text-gray-400 group-hover:text-teal-500 p-2">
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
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-xl border border-gray-100 font-sans">
      <div className="space-y-4 mb-8">
        <div className="cursor-pointer">
          <InputGroup label="Location" value="New Zealand">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </InputGroup>
        </div>

        <div className="cursor-pointer">
          <InputGroup label="Activity Type" value="Adventure">
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </InputGroup>
        </div>

        <InputGroup
          label="Date"
          value="2023-11-06"
          type="date"
          icon={<i className="pi pi-calendar"></i>}
        >
          <Calendar
            className="calendar-no-border input-date"
            value={selectDate}
            onChange={(e) => setSelectDate(e.value || null)}
          />
        </InputGroup>

        <InputGroup
          label="Time"
          value="13:45"
          type="time"
          icon={<i className="pi pi-clock"></i>}
        >
          <Calendar
            className="calendar-no-border input-date"
            value={selectDate}
            onChange={(e) => setSelectDate(e.value || null)}
            timeOnly
            hourFormat="24"
          />
        </InputGroup>

        <div className="border border-gray-200 rounded-full px-5 py-2.5 flex items-center justify-between bg-white">
          <div>
            <label className="text-teal-800 font-bold text-sm block">
              Traveler
            </label>
            <span className="text-teal-800 font-bold text-sm">{travelers}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTravelers(Math.max(1, travelers - 1))}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:cursor-pointer"
            >
              <i className="pi pi-minus" style={{ fontSize: 12 }}></i>
            </button>
            <button
              onClick={() => setTravelers(travelers + 1)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:cursor-pointer"
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
        <SectionTitle title="Cities" />

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full border border-gray-200 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:border-teal-500"
          />
          <i className="pi pi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div className="space-y-3 pl-1">
          {["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"].map(
            (city) => (
              <label
                key={city}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 border-2 border-gray-200 rounded checked:bg-teal-600 checked:border-teal-600 focus:ring-0 cursor-pointer accent-teal-600"
                />
                <span className="text-teal-800 font-medium text-sm group-hover:text-teal-600">
                  {city}
                </span>
              </label>
            ),
          )}
        </div>

        <button className="text-teal-700 font-bold text-sm mt-4 hover:underline">
          Show More...
        </button>
      </div>

      <Divider />

      <div className="mb-8">
        <SectionTitle title="Duration (in Nights)" />

        <div className="px-2">
          <Slider
            value={duration}
            onChange={(e) =>
              setDuration(typeof e.value === "number" ? e.value : e.value[0])
            }
          />
          <div className="flex justify-between mt-2 text-sm font-medium text-gray-600">
            <span>1 Night</span>
            <span>{(duration / 10).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="mb-8">
        <SectionTitle title="Type of Theme" />
        <div className="space-y-3 pl-1">
          {["Wild life", "Adventure", "Desert", "Culture"].map((theme) => (
            <label
              key={theme}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-gray-200 rounded checked:bg-teal-600 checked:border-teal-600 focus:ring-0 cursor-pointer accent-teal-600"
              />
              <span className="text-teal-800 font-medium text-sm group-hover:text-teal-600">
                {theme}
              </span>
            </label>
          ))}
        </div>
        <button className="text-teal-700 font-bold text-sm mt-4 hover:underline">
          Show More...
        </button>
      </div>

      <Divider />

      <div>
        <SectionTitle title="Hotel Rating" />
        <div className="space-y-3 pl-1">
          {[
            { stars: 5, count: 150 },
            { stars: 4, count: 2850 },
          ].map((rating, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-gray-200 rounded checked:bg-teal-600 checked:border-teal-600 accent-teal-600"
              />
              <div className="flex items-center gap-1">
                <span className="text-teal-800 font-bold text-sm w-3">
                  {rating.stars}
                </span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`pi pi-star ${i < rating.stars ? "" : "text-gray-300"}`}
                      style={{ fontSize: 14 }}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-400 text-xs ml-1">
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
