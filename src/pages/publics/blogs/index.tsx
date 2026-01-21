import { enumData } from "@/common/enums/enum";
import BannerComponent from "@/components/ui/banner";
import Title from "@/components/ui/Tilte";
import { useRouter } from "@/routes/hooks/use-router";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Paginator } from "primereact/paginator";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Tag } from "primereact/tag";
import { useState } from "react";
import NewSection from "../home/new-section";

export default function BlogScreen() {
  const router = useRouter();
  const newsArticles = [
    {
      id: 1,
      title: "The Top Travel Destinations for Photography Enthusiasts",
      author: "Joey Peterson",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      date: "05",
      month: "JUNE",
    },
    {
      id: 2,
      title: "The Best Ways to Travel with Your Significant Other",
      author: "Aliena Smith",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      date: "06",
      month: "JUNE",
    },
    {
      id: 3,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 4,
      title: "The Top Travel Destinations for Photography Enthusiasts",
      author: "Joey Peterson",
      image:
        "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=800&q=80",
      date: "05",
      month: "JUNE",
    },
    {
      id: 5,
      title: "The Best Ways to Travel with Your Significant Other",
      author: "Aliena Smith",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
      date: "06",
      month: "JUNE",
    },
    {
      id: 6,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 7,
      title: "The Top Travel Destinations for Photography Enthusiasts",
      author: "Joey Peterson",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      date: "05",
      month: "JUNE",
    },
    {
      id: 8,
      title: "The Best Ways to Travel with Your Significant Other",
      author: "Aliena Smith",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      date: "06",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
    {
      id: 9,
      title: "Top 3 Adventure Destinations for Your Next Holiday",
      author: "Ranin Colun",
      image:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&q=80",
      date: "07",
      month: "JUNE",
    },
  ];

  const [first, setFirst] = useState(0);
  const itemsPerPage = 9;

  const onPageChange = (event: any) => {
    setFirst(event.first);
  };

  const currentArticles = newsArticles.slice(first, first + itemsPerPage);

  const renderBlogCard = (article: any) => {
    const header = (
      <div className="relative">
        <img
          alt={article.title}
          src={article.image}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/75" />
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-16">
          <div className="text-xl font-bold text-teal-600">{article.date}</div>
          <div className="text-xs font-semibold text-teal-600">
            {article.month}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Tag
            value={`by ${article.author}`}
            severity="warning"
            className="mb-3"
          />
          <h3 className="text-xl font-bold text-white leading-tight">
            {article.title}
          </h3>
        </div>
      </div>
    );

    return (
      <Card
        header={header}
        className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        onClick={() => router.push(`/blogs/${article.id}`)}
      />
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <section className="relative pt-4">
        <BannerComponent type="BLOG" />
      </section>
      {/* Blog Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <Title>Blog</Title>
          <p className="text-xl text-slate-500  mx-auto font-light leading-relaxed">
            Cập nhật những xu hướng du lịch mới nhất và những mẹo hữu ích cho
            chuyến đi của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {currentArticles.map((article) => (
            <div key={article.id}>{renderBlogCard(article)}</div>
          ))}
        </div>

        <Paginator
          currentPageReportTemplate={`Hiển thị {first} - {last} trong tổng số {totalRecords} bài viết`}
          totalRecords={newsArticles.length}
          rows={itemsPerPage}
          first={first}
          onPageChange={onPageChange}
          rowsPerPageOptions={enumData.PAGE.LST_PAGESIZE}
          template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          className="w-full border-none custom-grid-paginator"
        />
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
