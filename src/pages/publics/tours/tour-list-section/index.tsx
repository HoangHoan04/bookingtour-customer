import type { TourDto } from "@/dto/tour.dto";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import SearchSidebar from "./filter-sidebar";
import TourItem from "./tour-item";

const mockToursData = [
  {
    id: "c33963f0-a124-4ab8-8900-835840f6d77a",
    createdAt: "2026-01-16T04:14:13.576Z",
    createdBy: "ADMIN",
    updatedAt: "2026-01-21T19:09:24.478Z",
    updatedBy: null,
    isDeleted: false,
    code: "TOUR-0001",
    title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
    slug: "sapa-chinh-phuc-dinh-fansipan-hung-vi",
    location: "Lào Cai, Việt Nam",
    durations: "3 ngày 2 đêm",
    shortDescription:
      "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
    longDescription:
      "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
    highlights: "Chinh phục đỉnh Fansipan, săn mây, khám phá văn hóa bản địa",
    included: "Hướng dẫn viên, vé tham quan, phương tiện di chuyển",
    excluded: "Chi phí cá nhân, đồ uống ngoài chương trình",
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    bookingCount: 9,
    category: "Du lịch khám phá",
    tags: ["Sapa", "Fansipan", "Tây Bắc", "Trekking"],
    status: "ACTIVE",
    flag: "BEST SELLER",
    __tourDetails__: [
      {
        id: "b3232e74-5ea0-47a9-8583-25d4c4e25147",
        createdAt: "2026-01-18T06:58:30.199Z",
        createdBy: "5ea5a861-f590-4b89-81d1-bb42873cc56d",
        updatedAt: "2026-01-21T19:09:24.474Z",
        updatedBy: null,
        isDeleted: false,
        tourId: "c33963f0-a124-4ab8-8900-835840f6d77a",
        code: "DETAIL-0001",
        startDay: "2025-02-20T00:00:00.000Z",
        endDay: "2025-02-28T00:00:00.000Z",
        startLocation: "Hà Nội",
        capacity: 20,
        remainingSeats: 11,
        status: "ACTIVE",
      },
    ],
    __reviews__: [],
  },
  {
    id: "c33963f0-a124-4ab8-8900-835840f6d77a",
    createdAt: "2026-01-16T04:14:13.576Z",
    createdBy: "ADMIN",
    updatedAt: "2026-01-21T19:09:24.478Z",
    updatedBy: null,
    isDeleted: false,
    code: "TOUR-0001",
    title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
    slug: "sapa-chinh-phuc-dinh-fansipan-hung-vi",
    location: "Lào Cai, Việt Nam",
    durations: "3 ngày 2 đêm",
    shortDescription:
      "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
    longDescription:
      "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
    highlights: "Chinh phục đỉnh Fansipan, săn mây, khám phá văn hóa bản địa",
    included: "Hướng dẫn viên, vé tham quan, phương tiện di chuyển",
    excluded: "Chi phí cá nhân, đồ uống ngoài chương trình",
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    bookingCount: 9,
    category: "Du lịch khám phá",
    tags: ["Sapa", "Fansipan", "Tây Bắc", "Trekking"],
    status: "ACTIVE",
    flag: "BEST SELLER",
    __tourDetails__: [
      {
        id: "b3232e74-5ea0-47a9-8583-25d4c4e25147",
        createdAt: "2026-01-18T06:58:30.199Z",
        createdBy: "5ea5a861-f590-4b89-81d1-bb42873cc56d",
        updatedAt: "2026-01-21T19:09:24.474Z",
        updatedBy: null,
        isDeleted: false,
        tourId: "c33963f0-a124-4ab8-8900-835840f6d77a",
        code: "DETAIL-0001",
        startDay: "2025-02-20T00:00:00.000Z",
        endDay: "2025-02-28T00:00:00.000Z",
        startLocation: "Hà Nội",
        capacity: 20,
        remainingSeats: 11,
        status: "ACTIVE",
      },
    ],
    __reviews__: [],
  },
  {
    id: "c33963f0-a124-4ab8-8900-835840f6d77a",
    createdAt: "2026-01-16T04:14:13.576Z",
    createdBy: "ADMIN",
    updatedAt: "2026-01-21T19:09:24.478Z",
    updatedBy: null,
    isDeleted: false,
    code: "TOUR-0001",
    title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
    slug: "sapa-chinh-phuc-dinh-fansipan-hung-vi",
    location: "Lào Cai, Việt Nam",
    durations: "3 ngày 2 đêm",
    shortDescription:
      "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
    longDescription:
      "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
    highlights: "Chinh phục đỉnh Fansipan, săn mây, khám phá văn hóa bản địa",
    included: "Hướng dẫn viên, vé tham quan, phương tiện di chuyển",
    excluded: "Chi phí cá nhân, đồ uống ngoài chương trình",
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    bookingCount: 9,
    category: "Du lịch khám phá",
    tags: ["Sapa", "Fansipan", "Tây Bắc", "Trekking"],
    status: "ACTIVE",
    flag: "BEST SELLER",
    __tourDetails__: [
      {
        id: "b3232e74-5ea0-47a9-8583-25d4c4e25147",
        createdAt: "2026-01-18T06:58:30.199Z",
        createdBy: "5ea5a861-f590-4b89-81d1-bb42873cc56d",
        updatedAt: "2026-01-21T19:09:24.474Z",
        updatedBy: null,
        isDeleted: false,
        tourId: "c33963f0-a124-4ab8-8900-835840f6d77a",
        code: "DETAIL-0001",
        startDay: "2025-02-20T00:00:00.000Z",
        endDay: "2025-02-28T00:00:00.000Z",
        startLocation: "Hà Nội",
        capacity: 20,
        remainingSeats: 11,
        status: "ACTIVE",
      },
    ],
    __reviews__: [],
  },
  {
    id: "c33963f0-a124-4ab8-8900-835840f6d77a",
    createdAt: "2026-01-16T04:14:13.576Z",
    createdBy: "ADMIN",
    updatedAt: "2026-01-21T19:09:24.478Z",
    updatedBy: null,
    isDeleted: false,
    code: "TOUR-0001",
    title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
    slug: "sapa-chinh-phuc-dinh-fansipan-hung-vi",
    location: "Lào Cai, Việt Nam",
    durations: "3 ngày 2 đêm",
    shortDescription:
      "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
    longDescription:
      "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
    highlights: "Chinh phục đỉnh Fansipan, săn mây, khám phá văn hóa bản địa",
    included: "Hướng dẫn viên, vé tham quan, phương tiện di chuyển",
    excluded: "Chi phí cá nhân, đồ uống ngoài chương trình",
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    bookingCount: 9,
    category: "Du lịch khám phá",
    tags: ["Sapa", "Fansipan", "Tây Bắc", "Trekking"],
    status: "ACTIVE",
    flag: "BEST SELLER",
    __tourDetails__: [
      {
        id: "b3232e74-5ea0-47a9-8583-25d4c4e25147",
        createdAt: "2026-01-18T06:58:30.199Z",
        createdBy: "5ea5a861-f590-4b89-81d1-bb42873cc56d",
        updatedAt: "2026-01-21T19:09:24.474Z",
        updatedBy: null,
        isDeleted: false,
        tourId: "c33963f0-a124-4ab8-8900-835840f6d77a",
        code: "DETAIL-0001",
        startDay: "2025-02-20T00:00:00.000Z",
        endDay: "2025-02-28T00:00:00.000Z",
        startLocation: "Hà Nội",
        capacity: 20,
        remainingSeats: 11,
        status: "ACTIVE",
      },
    ],
    __reviews__: [],
  },
  {
    id: "c33963f0-a124-4ab8-8900-835840f6d77a",
    createdAt: "2026-01-16T04:14:13.576Z",
    createdBy: "ADMIN",
    updatedAt: "2026-01-21T19:09:24.478Z",
    updatedBy: null,
    isDeleted: false,
    code: "TOUR-0001",
    title: "Sapa - Chinh Phục Đỉnh Fansipan Hùng Vĩ",
    slug: "sapa-chinh-phuc-dinh-fansipan-hung-vi",
    location: "Lào Cai, Việt Nam",
    durations: "3 ngày 2 đêm",
    shortDescription:
      "Khám phá thị trấn trong sương, chinh phục nóc nhà Đông Dương và tìm hiểu văn hóa bản địa độc đáo.",
    longDescription:
      "Trải nghiệm cái lạnh đặc trưng của vùng cao Tây Bắc, có thể có tuyết rơi vào mùa đông. Chinh phục đỉnh Fansipan bằng cáp treo hoặc leo núi (trekking) cho người thích mạo hiểm. Tham quan bản Cát Cát của người H'mong, ngắm ruộng bậc thang vàng óng. Thưởng thức đồ nướng nóng hổi, thắng cố và lẩu cá hồi Sapa. Săn mây trên đỉnh núi, không khí lãng mạn phù hợp cho các cặp đôi.",
    highlights: "Chinh phục đỉnh Fansipan, săn mây, khám phá văn hóa bản địa",
    included: "Hướng dẫn viên, vé tham quan, phương tiện di chuyển",
    excluded: "Chi phí cá nhân, đồ uống ngoài chương trình",
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    bookingCount: 9,
    category: "Du lịch khám phá",
    tags: ["Sapa", "Fansipan", "Tây Bắc", "Trekking"],
    status: "ACTIVE",
    flag: "BEST SELLER",
    __tourDetails__: [
      {
        id: "b3232e74-5ea0-47a9-8583-25d4c4e25147",
        createdAt: "2026-01-18T06:58:30.199Z",
        createdBy: "5ea5a861-f590-4b89-81d1-bb42873cc56d",
        updatedAt: "2026-01-21T19:09:24.474Z",
        updatedBy: null,
        isDeleted: false,
        tourId: "c33963f0-a124-4ab8-8900-835840f6d77a",
        code: "DETAIL-0001",
        startDay: "2025-02-20T00:00:00.000Z",
        endDay: "2025-02-28T00:00:00.000Z",
        startLocation: "Hà Nội",
        capacity: 20,
        remainingSeats: 11,
        status: "ACTIVE",
      },
    ],
    __reviews__: [],
  },
];

const mockTours = mockToursData as TourDto[];

const TourListSection = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <div className="py-20 flex justify-center items-center gap-1.5">
      <section className="w-1/3">
        <SearchSidebar />
      </section>
      <section className="w-2/3 h-full flex-col gap-6 flex items-start">
        {mockTours.length > 0 &&
          mockTours.map((tour) => <TourItem key={tour.id} {...tour} />)}
        <Paginator
          first={first}
          rows={rows}
          totalRecords={120}
          onPageChange={onPageChange}
          className="self-center bg-transparent"
        />
      </section>
    </div>
  );
};

export default TourListSection;
