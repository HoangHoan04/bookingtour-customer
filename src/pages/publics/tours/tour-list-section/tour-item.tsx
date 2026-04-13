import ShineButton from "@/components/ui/botton/ShineButton";
import type { TourDto } from "@/dto/tour.dto";
import { Rating } from "primereact/rating";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const TourItem = (tour: TourDto) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const firstTourDetailId = tour.__tourDetails__?.[0]?.id;
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className={`flex h-92.5 max-w-225 overflow-hidden rounded-4xl border shadow-lg hover:cursor-pointer hover:shadow-2xl transition ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-white border-transparent"
      }`}
    >
      <div className="relative w-[40%]">
        <img
          src={
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG91cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          }
          alt={tour.title}
          className="h-full w-full object-cover z-30"
        />
      </div>

      <div className="flex w-[55%] flex-col justify-between p-8">
        <div className="flex items-start justify-between relative">
          <div className="absolute -left-8 flex items-center gap-2 bg-[#066168] px-5 py-3 rounded-r-full text-white">
            <span className="text-sm">📅</span>
            <span className="text-sm font-medium">{tour.durations}</span>
          </div>

          <div></div>

          <div className="text-right">
            {/* <p className="text-3xl font-bold text-orange-500">${tour.price?.toFixed(2) || "N/A"}</p> */}
            <p
              className={`text-sm ${isDark ? "text-slate-300" : "text-gray-500"}`}
            >
              Per Day
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3
            className={`text-3xl font-bold duration-300 ${
              isDark
                ? "text-teal-300 hover:text-amber-300"
                : "text-teal-800 hover:text-amber-400"
            }`}
          >
            {tour.title}
          </h3>

          <p
            className={`mt-4 max-w-xl leading-relaxed ${
              isDark ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {tour.shortDescription}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <ShineButton
            label="Xem mọi giá"
            handleClick={(e) => {
              e.preventDefault();
              if (!firstTourDetailId) {
                navigate(`/tours/${tour.slug}`);
                return;
              }

              navigate(`/tours-details/${firstTourDetailId}/all-prices`, {
                state: { tour },
              });
            }}
            buttonStyles={{
              height: "40px",
              marginTop: 0,
              padding: 0,
              fontWeight: "400",
            }}
          />

          <div className="text-right">
            <p
              className={`text-sm ${isDark ? "text-slate-300" : "text-gray-500"}`}
            >
              ({tour.reviewCount} Review)
            </p>
            <div className="mt-1 flex justify-end gap-1 text-orange-400">
              <Rating
                value={tour.rating}
                readOnly
                cancel={false}
                color="#f59e0b"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourItem;
