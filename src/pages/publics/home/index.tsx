import { enumData } from "@/common/enums/enum";
import BannerComponent from "@/components/ui/banner";
import SearchBar from "@/components/ui/search-bar";
import ContactSection from "./contact-section";
import PopularDestinationsSection from "./destination-section";
import HintMonthSection from "./hint-section";
import NewSection from "./new-section";
import PopularTourSection from "./tour-section";

export default function HomeSection() {
  return (
    <div className="min-h-screen ">
      <section className="relative pt-4">
        <BannerComponent type={enumData.BANNER_TYPE.HOME.code} />
      </section>

      <SearchBar />

      <section className="max-w-7xl mx-auto">
        <PopularDestinationsSection />
      </section>

      <section className="max-w-7xl mx-auto">
        <PopularTourSection />
      </section>

      <section className="max-w-7xl mx-auto">
        <NewSection />
      </section>

      <section className="max-w-7xl mx-auto">
        <HintMonthSection />
      </section>

      <section className=" border-t ">
        <ContactSection />
      </section>
    </div>
  );
}
