import ShineButton from "@/components/ui/botton/ShineButton";
import type { TourDto } from "@/dto/tour.dto";
import { Rating } from "primereact/rating";
import { Link, useNavigate } from "react-router-dom";

const TourItem = (tour: TourDto) => {
  const navigate = useNavigate();
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="flex h-[370px] max-w-[900px] overflow-hidden rounded-[32px] bg-white shadow-lg hover:cursor-pointer hover:shadow-2xl transition"
    >
      <div className="relative w-[40%]">
        <img
          src={
            "https://travlla.dexignzone.com/tailwind/demo/assets/images/tour/style1/pic1.jpg"
          }
          alt={tour.title}
          className="h-full w-full object-cover z-30"
        />
      </div>

      <div className="flex w-[55%] flex-col justify-between p-8">
        <div className="flex items-start justify-between relative">
          <div className=" absolute left-[-32px] flex items-center gap-2 bg-[#066168] px-5 py-3 rounded-r-full text-white">
            <span className="text-sm">📅</span>
            <span className="text-sm font-medium">{tour.durations}</span>
          </div>

          <div></div>

          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">$192</p>
            <p className="text-sm text-gray-500">Per Day</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-3xl font-bold text-teal-800 hover:text-amber-400 duration-300">
            {tour.title}
          </h3>

          <p className="mt-4 max-w-xl text-gray-600 leading-relaxed">
            {tour.shortDescription}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <ShineButton
            label="Book Now"
            handleClick={(e) => {
              e.preventDefault();
              navigate(`/tours/booking/${tour.slug}`);
            }}
            buttonStyles={{
              height: "40px",
              marginTop: 0,
              padding: 0,
              fontWeight: "400",
            }}
          />

          <div className="text-right">
            <p className="text-sm text-gray-500">(4.8 Review)</p>
            <div className="mt-1 flex justify-end gap-1 text-orange-400">
              <Rating value={4.8} readOnly cancel={false} color="#f59e0b" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourItem;
