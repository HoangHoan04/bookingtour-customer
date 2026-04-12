import { useTheme } from "@/context/ThemeContext";
import TourListSection from "./tour-list-section";

const TourScreen = () => {
  const { theme } = useTheme();
  return (
    <div className={theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#EFFFFF]"}>
      <section className="tour-section max-w-7xl mx-auto">
        <TourListSection />
      </section>
    </div>
  );
};

export default TourScreen;
