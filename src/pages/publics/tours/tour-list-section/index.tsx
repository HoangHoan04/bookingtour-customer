import { useState } from "react";
import SearchSidebar from "./filter-sidebar";
import TourItem from "./tour-item";
import { Paginator } from "primereact/paginator";
import { usePaginationTour } from "@/hooks/tour";

const TourListSection = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const { data, total } = usePaginationTour({
    skip: 0,
    take: 10,
    where: {},
  });

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <div className="py-20 flex justify-center items-start gap-1.5">
      <section className="w-1/3">
        <SearchSidebar />
      </section>
      <section className="w-2/3 h-full flex-col gap-6 flex">
        {data.length > 0 &&
          data.map((tour) => <TourItem key={tour.id} {...tour} />)}
        <Paginator
          first={data.length > 0 ? first : 0}
          rows={rows}
          totalRecords={total}
          onPageChange={onPageChange}
          className="self-center bg-transparent"
        />
      </section>
    </div>
  );
};

export default TourListSection;
