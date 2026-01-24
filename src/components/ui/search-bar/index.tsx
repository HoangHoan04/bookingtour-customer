import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function SearchBar() {
  const [location, setLocation] = useState("New Zealand");
  const [activityType, setActivityType] = useState("Adventure");
  const [date, setDate] = useState<Date | null | undefined>(null);
  const [travelers, setTravelers] = useState<number | null | undefined>(1);

  const locations = [
    { label: "New Zealand", value: "New Zealand" },
    { label: "Australia", value: "Australia" },
    { label: "Thailand", value: "Thailand" },
    { label: "Japan", value: "Japan" },
  ];

  const activities = [
    { label: "Adventure", value: "Adventure" },
    { label: "Beach", value: "Beach" },
    { label: "Culture", value: "Culture" },
    { label: "Nature", value: "Nature" },
  ];

  return (
    <div className="h-full flex items-start justify-center py-20">
      <div className="w-full border-0 rounded-full max-w-6xl px-2">
        <div className="rounded-3xl border p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <i className="pi pi-map-marker text-teal-600 text-lg"></i>
                <label className="text-sm text-gray-600 font-medium">
                  Địa điểm
                </label>
              </div>
              <Dropdown
                value={location}
                onChange={(e) => setLocation(e.value)}
                options={locations}
                className="w-full"
                panelClassName="text-sm"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <i className="pi pi-compass text-teal-600 text-lg"></i>
                <label className="text-sm text-gray-600 font-medium">
                  Loại hoạt động
                </label>
              </div>
              <Dropdown
                value={activityType}
                onChange={(e) => setActivityType(e.value)}
                options={activities}
                className="w-full"
                panelClassName="text-sm"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <i className="pi pi-calendar text-teal-600 text-lg"></i>
                <label className="text-sm text-gray-600 font-medium">
                  Ngày khởi hành
                </label>
              </div>
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                placeholder="Ngày khởi hành"
                className="w-full"
                dateFormat="dd/mm/yy"
                showIcon={false}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <i className="pi pi-users text-teal-600 text-lg"></i>
                <label className="text-sm text-gray-600 font-medium">
                  Số người
                </label>
              </div>
              <InputNumber
                value={travelers}
                onValueChange={(e) => setTravelers(e.value)}
                showButtons
                buttonLayout="horizontal"
                min={1}
                max={20}
                decrementButtonClassName="p-button-text"
                incrementButtonClassName="p-button-text"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <button className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-full p-4 flex items-center justify-center transition-colors duration-200 shadow-md">
                <i className="pi pi-search text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
