import SearchSidebar from "../tour-list-section/filter-sidebar";
import TourDetailSection from "./detail-section";
import { useTourBySlug } from "@/hooks/tour";
import { useParams } from "react-router";
import GlobalLoading from "@/components/ui/loading";

const TourDetailScreen = () => {
  const { slug } = useParams();
  const { data: tourData, isLoading } = useTourBySlug(slug || undefined);

  if (isLoading || !tourData) {
    return <GlobalLoading />;
  }

  return (
    <div className="bg-[#EFFFFF]">
      <div className="max-w-7xl mx-auto flex gap-8 py-20">
        <section className="w-1/3">
          <SearchSidebar />
        </section>
        <section className="w-2/3">
          <TourDetailSection tour={tourData} />
        </section>
      </div>
    </div>
  );
};

export default TourDetailScreen;
