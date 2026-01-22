import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import { useRouter } from "@/routes/hooks";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";

interface TourGuide {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface TourGuideDetail {
  id: number;
  name: string;
  avatar: string;
  role: string;
  description: string;
  age: number;
  education: string;
  jobTitle: string;
  location: string;
  experienceYears: number;
  contact: string;
  email: string;
  skills: string[];
  certifications: Array<{
    title: string;
    description: string;
  }>;
}

const mockTourGuides: TourGuide[] = [
  {
    id: 1,
    name: "Alexis Cox",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Murray",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Crawford",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Murphy",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Sarah Wilson",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "James Anderson",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Emma Thompson",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    name: "David Chen",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Lisa Martinez",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Michael Brown",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Sophie Davis",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Ryan Taylor",
    role: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop",
  },
];

const mockTourGuideDetail: TourGuideDetail = {
  id: 4,
  name: "Murphy",
  avatar:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop",
  role: "Travel Guide & Photographer",
  description:
    "Đưa bạn khám phá những cung đường đẹp nhất Việt Nam và Đông Nam Á với niềm đam mê bất tận. Chuyên về trekking, nhiếp ảnh du lịch và trải nghiệm văn hóa bản địa.",
  age: 36,
  education: "BSc of Tourism Management",
  jobTitle: "Senior Tour Guide",
  location: "Ho Chi Minh City, Vietnam",
  experienceYears: 8,
  contact: "+84 912 345 678",
  email: "murphy.travel.vn@gmail.com",
  skills: [
    "Communication & storytelling",
    "Leadership & crisis management",
    "Time coordination & logistics",
    "Multicultural sensitivity",
    "Cultural interpretation",
    "First aid & safety awareness",
    "Drone photography & videography",
  ],
  certifications: [
    {
      title: "Vietnam Tourism Certification",
      description:
        "Certified National Tour Guide – Vietnam National Administration of Tourism",
    },
    {
      title: "WFTGA Member",
      description: "World Federation of Tourist Guide Associations",
    },
    { title: "Wilderness First Aid", description: "Red Cross certified" },
    {
      title: "Sustainable Tourism",
      description: "GSTC – Global Sustainable Tourism Council",
    },
  ],
};

const fetchTourGuideDetail = async (id: number): Promise<TourGuideDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTourGuideDetail), 600);
  });
};

const fetchRelatedGuides = async (): Promise<TourGuide[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTourGuides), 800);
  });
};

export default function TourGuideDetailScreen() {
  const router = useRouter();
  const [tourGuide, setTourGuide] = useState<TourGuideDetail | null>(null);
  const [relatedGuides, setRelatedGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const guideId = 4;

        const [detail, related] = await Promise.all([
          fetchTourGuideDetail(guideId),
          fetchRelatedGuides(),
        ]);

        setTourGuide(detail);
        setRelatedGuides(related);
      } catch (error) {
        console.error("Failed to load tour guide data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const tourGuideTemplate = (tour: TourGuide) => {
    const isHovered = hoveredCard === tour.id;

    return (
      <div
        className="p-3 cursor-pointer"
        onMouseEnter={() => setHoveredCard(tour.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => router.push(`/tour-guide/${tour.id}`)}
      >
        <div className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl">
          <div className="relative overflow-hidden">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-80 object-cover transition-transform duration-700"
              style={{ transform: isHovered ? "scale(1.12)" : "scale(1)" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(13, 115, 119, 0.92), transparent)",
              }}
            >
              <div className="flex items-center gap-3 ">
                <i className="pi pi-user text-2xl" />
                <h3 className="text-2xl font-bold">{tour.name}</h3>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <i className="pi pi-briefcase text-2xl text-teal-700" />
              <p className="text-lg font-semibold">Hướng dẫn viên du lịch</p>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-6">
                {[
                  { icon: FacebookIcon, label: "Facebook" },
                  { icon: YoutubeIcon, label: "YouTube" },
                  { icon: ZaloIcon, label: "Zalo" },
                  { icon: TiktokIcon, label: "TikTok" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="transition-transform hover:scale-110 active:scale-95"
                    aria-label={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-8 h-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading || !tourGuide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải thông tin hướng dẫn viên...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="group relative overflow-hidden rounded-3xl shadow-2xl border transition-all duration-300 hover:shadow-3xl">
              <div className="relative h-96 overflow-hidden rounded-2xl ">
                <Image
                  src={tourGuide.avatar}
                  alt={tourGuide.name}
                  className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Social icons */}
                <div className="absolute bottom-15 right-6 z-20 flex flex-col gap-3">
                  {[
                    { icon: FacebookIcon, label: "Facebook" },
                    { icon: YoutubeIcon, label: "YouTube" },
                    { icon: ZaloIcon, label: "Zalo" },
                    { icon: TiktokIcon, label: "TikTok" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-lg transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="h-6 w-6"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative -mt-20 px-8 pb-10 pt-14 text-center">
                <h3 className="text-3xl font-bold ">{tourGuide.name}</h3>
                <p className="mt-2 text-xl font-semibold text-teal-600">
                  {tourGuide.role}
                </p>
                <p className="mt-5 leading-relaxed">{tourGuide.description}</p>
              </div>
            </Card>
          </div>

          {/* Right - Detail Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">
              Thông tin hướng dẫn viên{" "}
              <span className="text-teal-600">{tourGuide.name}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <InfoItem icon="pi-user" label="Tuổi" value={tourGuide.age} />
                <InfoItem
                  icon="pi-book"
                  label="Học vấn"
                  value={tourGuide.education}
                />
                <InfoItem
                  icon="pi-briefcase"
                  label="Chức vụ"
                  value={tourGuide.jobTitle}
                />
              </div>
              <div className="space-y-4">
                <InfoItem
                  icon="pi-map-marker"
                  label="Địa điểm"
                  value={tourGuide.location}
                />
                <InfoItem
                  icon="pi-calendar"
                  label="Kinh nghiệm"
                  value={`${tourGuide.experienceYears} năm`}
                />
                <InfoItem
                  icon="pi-phone"
                  label="Liên hệ"
                  value={tourGuide.contact}
                />
              </div>
            </div>

            <div className="mb-8">
              <InfoItem
                icon="pi-envelope"
                label="Email"
                value={tourGuide.email}
                noMb
              />
            </div>

            <Divider />

            <h3 className="text-2xl font-bold text-teal-800 mt-10 mb-5">
              Kỹ năng nổi bật
            </h3>
            <ul className="space-y-3 mb-10">
              {tourGuide.skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <i className="pi pi-check-circle text-teal-500 text-xl" />
                  {skill}
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-teal-800 mb-5">
              Chứng chỉ & Đào tạo
            </h3>
            <ul className="space-y-4">
              {tourGuide.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <i className="pi pi-verified text-orange-500 mt-1 text-xl" />
                  <div>
                    <p className="font-semibold ">{cert.title}</p>
                    <p className="">{cert.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Guides Carousel */}
        <div className="mt-20">
          <h2 className="text-center text-4xl font-bold mb-3">
            Gặp gỡ các <span className="text-teal-600">Hướng dẫn viên</span>{" "}
            khác
          </h2>
          <p className="text-center mb-10">
            Khám phá thêm những người bạn đồng hành tuyệt vời cho hành trình của
            bạn
          </p>

          <Carousel
            value={relatedGuides}
            numVisible={4}
            numScroll={1}
            circular
            autoplayInterval={3500}
            itemTemplate={tourGuideTemplate}
            responsiveOptions={[
              { breakpoint: "1280px", numVisible: 4, numScroll: 1 },
              { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
              { breakpoint: "768px", numVisible: 2, numScroll: 1 },
              { breakpoint: "560px", numVisible: 1, numScroll: 1 },
            ]}
            className="tour-guide-carousel"
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  noMb = false,
}: {
  icon: string;
  label: string;
  value: string | number;
  noMb?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${!noMb ? "mb-3" : ""}`}>
      <div className="flex items-center gap-3 min-w-35">
        <i className={`pi ${icon} text-teal-600 text-xl`} />
        <span className="font-semibold text-teal-700">{label}:</span>
      </div>
      <span className="">{value}</span>
    </div>
  );
}
