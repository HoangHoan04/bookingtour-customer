import { formatDate } from "@/common/helpers/format";
import LabelTag from "@/components/ui/LabelTag";
import Title from "@/components/ui/Tilte";
import type { NewDto } from "@/dto/new.dto";
import { useNewDetail, useRelatedNews } from "@/hooks/news";
import { useRouter } from "@/routes/hooks/use-router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useParams } from "react-router-dom";

export default function NewDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: news, isLoading } = useNewDetail(id);
  const { data: relatedNews } = useRelatedNews(id, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton width="100%" height="3rem" className="mb-4" />
              <Skeleton width="100%" height="24rem" className="mb-4" />
              <Skeleton width="100%" height="10rem" />
            </div>
            <div>
              <Skeleton width="100%" height="20rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <Button label="Quay lại" onClick={() => router.push("/news")} />
        </div>
      </div>
    );
  }

  const featuredImage =
    news.images && news.images.length > 0 ? news.images[0] : null;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-center mb-6">
              <Title>{news.titleVI || news.titleEN}</Title>
            </div>

            <Divider />

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative mb-6">
                <Image
                  src={featuredImage.fileUrl}
                  alt={news.titleVI || news.titleEN}
                  className="w-full"
                  imageClassName="w-full h-96 object-cover transition-transform duration-500 rounded-2xl"
                />
              </div>
            )}

            {/* Article Meta */}
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-calendar"></i>
                <span>{formatDate(news.createdAt)}</span>
              </span>
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-tag"></i>
                <span>{news.type || "NEWS"}</span>
              </span>
              {news.status && <Tag value={news.status} severity="info" />}
            </div>

            {/* Article Content VI */}
            {news.contentVI && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Nội dung (Tiếng Việt)
                </h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.contentVI }}
                />
              </div>
            )}

            {/* Article Content EN */}
            {news.contentEN && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Content (English)</h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.contentEN }}
                />
              </div>
            )}

            {/* External Link */}
            {news.url && (
              <div className="mb-8">
                <Button
                  label="Xem bài viết gốc"
                  icon="pi pi-external-link"
                  onClick={() => window.open(news.url, "_blank")}
                  className="bg-teal-600 hover:bg-teal-700 border-teal-600"
                />
              </div>
            )}

            {/* Related News */}
            {relatedNews && relatedNews.length > 0 && (
              <div className="mt-12">
                <LabelTag>Tin tức liên quan</LabelTag>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {relatedNews.map((item: NewDto) => {
                    const itemImage =
                      item.images && item.images.length > 0
                        ? item.images[0].fileUrl
                        : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

                    return (
                      <Card
                        key={item.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => router.push(`/news/${item.id}`)}
                      >
                        <div className="flex gap-4">
                          <img
                            src={itemImage}
                            alt={item.titleVI || item.titleEN}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold line-clamp-2 mb-2">
                              {item.titleVI || item.titleEN}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* News Info Card */}
            <Card className="mb-6 border-0 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-teal-700">
                Thông tin bài viết
              </h3>

              {news.effectiveStartDate && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">
                    Ngày bắt đầu hiệu lực:
                  </p>
                  <p className="font-medium">
                    {formatDate(news.effectiveStartDate)}
                  </p>
                </div>
              )}

              {news.effectiveEndDate && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">
                    Ngày kết thúc hiệu lực:
                  </p>
                  <p className="font-medium">
                    {formatDate(news.effectiveEndDate)}
                  </p>
                </div>
              )}

              {news.rank !== null && news.rank !== undefined && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Xếp hạng:</p>
                  <p className="font-medium">{news.rank}</p>
                </div>
              )}

              <div className="mb-3">
                <p className="text-sm text-gray-500">Trạng thái hiển thị:</p>
                <Tag
                  value={news.isVisible ? "Đang hiển thị" : "Đã ẩn"}
                  severity={news.isVisible ? "success" : "danger"}
                />
              </div>
            </Card>

            {/* Share Card */}
            <Card className="border-0 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-teal-700">
                Chia sẻ bài viết
              </h3>
              <div className="flex gap-2">
                <Button
                  icon="pi pi-facebook"
                  rounded
                  className="w-10 h-10 bg-blue-600 text-white border-blue-600"
                />
                <Button
                  icon="pi pi-twitter"
                  rounded
                  className="w-10 h-10 bg-blue-400 text-white border-blue-400"
                />
                <Button
                  icon="pi pi-share-alt"
                  rounded
                  className="w-10 h-10 bg-gray-600 text-white border-gray-600"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
