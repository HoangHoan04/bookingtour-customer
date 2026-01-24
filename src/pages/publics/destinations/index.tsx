import { enumData } from "@/common/enums/enum";
import BannerComponent from "@/components/ui/banner";
import Title from "@/components/ui/Tilte";
import { usePaginationDestination } from "@/hooks/destination";
import { useRouter } from "@/routes/hooks/use-router";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useState } from "react";
import NewSection from "../home/new-section";

export default function DestinationScreen() {
  const router = useRouter();
  const [first, setFirst] = useState(0);
  const itemsPerPage = 9;

  const {
    data: destinations,
    total,
    isLoading,
  } = usePaginationDestination({
    skip: first,
    take: itemsPerPage,
    where: {
      isDeleted: false,
    },
  });

  const onPageChange = (event: any) => {
    setFirst(event.first);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
    return { day, month };
  };

  const renderDestinationCard = (destination: any) => {
    const { day, month } = formatDate(
      destination.createdAt || destination.publishedAt,
    );

    const header = (
      <div className="relative">
        <img
          alt={destination.title}
          src={destination.image?.fileUrl}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/75" />
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-16">
          <div className="text-xl font-bold text-teal-600">{day}</div>
          <div className="text-xs font-semibold text-teal-600">{month}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Tag
            value={`by ${destination.author?.fullName || destination.author?.username || "Admin"}`}
            severity="warning"
            className="mb-3"
          />
          <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
            {destination.title}
          </h3>
        </div>
      </div>
    );

    return (
      <Card
        header={header}
        className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        onClick={() => router.push(`/destinations/${destination.slug}`)}
      />
    );
  };

  const renderSkeletonCard = () => {
    return (
      <Card className="overflow-hidden">
        <Skeleton width="100%" height="20rem" />
        <div className="p-4">
          <Skeleton width="60%" className="mb-2" />
          <Skeleton width="100%" height="4rem" />
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <section className="relative pt-4">
        <BannerComponent type={enumData.BANNER_TYPE.DESTINATION.code} />
      </section>
      {/* Destination Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <Title>Điểm đến</Title>
          <p className="text-xl text-slate-500  mx-auto font-light leading-relaxed">
            Cập nhật những xu hướng du lịch mới nhất và những mẹo hữu ích cho
            chuyến đi của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <div key={index}>{renderSkeletonCard()}</div>
            ))
          ) : destinations.length > 0 ? (
            destinations.map((destination) => (
              <div key={destination.id}>
                {renderDestinationCard(destination)}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-slate-500">Chưa có điểm đến nào</p>
            </div>
          )}
        </div>

        {!isLoading && total > 0 && (
          <Paginator
            currentPageReportTemplate={`Hiển thị {first} - {last} trong tổng số {totalRecords} điểm đến`}
            totalRecords={total}
            rows={itemsPerPage}
            first={first}
            onPageChange={onPageChange}
            rowsPerPageOptions={enumData.PAGE.LST_PAGESIZE}
            template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            className="w-full border-none custom-grid-paginator"
          />
        )}
      </section>

      <Divider />

      <section className="max-w-7xl mx-auto">
        <NewSection />
      </section>

      {/* Wave Separator */}
      <svg
        className="w-full h-24"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C240 40 480 80 720 80C960 80 1200 40 1440 0V120H0V0Z"
          fill="#FFA500"
        />
      </svg>
    </div>
  );
}
