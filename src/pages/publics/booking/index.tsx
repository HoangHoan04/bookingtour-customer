import BookingSection from "./booking-section";
import { useTheme } from "@/context/ThemeContext";

const BookingScreen = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`py-10 px-4 md:px-8 lg:px-16 ${theme === "dark" ? "bg-[#1a202c]" : "bg-[#f8f9fa]"}`}
    >
      <div className="max-w-7xl mx-auto">
        <BookingSection />
      </div>
    </div>
  );
};

export default BookingScreen;
