import LabelTag from "@/components/ui/LabelTag";
import Title from "@/components/ui/Tilte";
import {
  useBlogBySlug,
  useCreateBlogComment,
  useIncrementBlogView,
  usePaginationBlogComment,
} from "@/hooks/blog";
import { useRouter } from "@/routes/hooks/use-router";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetailScreen() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: blog, isLoading } = useBlogBySlug(slug);
  const { incrementView } = useIncrementBlogView();
  const { createComment, isLoading: isCreatingComment } =
    useCreateBlogComment();
  const [commentForm, setCommentForm] = useState({
    content: "",
  });
  const { data: comments, refetch: refetchComments } = usePaginationBlogComment(
    {
      skip: 0,
      take: 100,
      where: {
        postId: blog?.id,
        status: "ACTIVE",
        isDeleted: false,
      },
    },
  );
  useEffect(() => {
    if (blog?.id) {
      incrementView(blog.id);
    }
  }, [blog.id, incrementView]);

  const handleSubmitComment = () => {
    if (!commentForm.content.trim()) {
      alert("Vui lòng nhập nội dung bình luận!");
      return;
    }

    if (!blog?.id) return;

    createComment(
      {
        postId: blog.id,
        content: commentForm.content,
      },
      {
        onSuccess: () => {
          setCommentForm({ content: "" });
          refetchComments();
          alert("Cảm ơn bạn đã bình luận!");
        },
      },
    );
  };

  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <Button label="Quay lại" onClick={() => router.push("/blogs")} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-center mb-6">
              <Title>{blog.title}</Title>
            </div>

            <Divider />
            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="relative mb-6">
                <Image
                  src={blog.featuredImage.fileUrl}
                  alt={blog.title}
                  className="w-full"
                  imageClassName={`w-full h-96 object-cover transition-transform duration-500 rounded-2xl`}
                />
              </div>
            )}

            {/* Article Meta */}
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-user"></i>
                <span>
                  {blog.author?.fullName || blog.author?.username || "Admin"}
                </span>
              </span>
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-calendar"></i>
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </span>
              {blog.category && (
                <span className="flex items-center justify-center gap-1">
                  <i className="pi pi-tag"></i>
                  <span>{blog.category}</span>
                </span>
              )}
              <span className="flex items-center justify-center gap-1">
                <i className="pi pi-eye"></i>
                <span>{blog.viewCount || 0} lượt xem</span>
              </span>
            </div>

            {blog.excerpt && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-gray-800 italic">{blog.excerpt}</p>
              </div>
            )}

            <div
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    icon="pi pi-facebook"
                    rounded
                    text
                    className="w-10 h-10 bg-blue-600 text-white"
                  />
                  <Button
                    icon="pi pi-twitter"
                    rounded
                    text
                    className="w-10 h-10 bg-blue-400 text-white"
                  />
                  <Button
                    icon="pi pi-instagram"
                    rounded
                    text
                    className="w-10 h-10 bg-pink-600 text-white"
                  />
                  <Button
                    icon="pi pi-youtube"
                    rounded
                    text
                    className="w-10 h-10 bg-red-600 text-white"
                  />
                </div>
              </div>
            )}

            {/* Customer Reviews/Comments */}
            <div className="mb-8">
              <LabelTag>Bình luận ({comments.length})</LabelTag>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="border-0 shadow-sm">
                    <div className="flex gap-4">
                      <Avatar
                        image={`https://i.pravatar.cc/150?u=${comment.customer?.id}`}
                        size="large"
                        shape="circle"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold">
                              {comment.customer?.fullName ||
                                comment.customer?.username ||
                                "Người dùng"}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="rounded-lg p-6">
              <LabelTag>Viết bình luận</LabelTag>
              <p className="mb-6">
                Hãy chia sẻ suy nghĩ của bạn về bài viết này
              </p>

              <Card className="shadow-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung bình luận <span className="text-red-500">*</span>
                    </label>
                    <InputTextarea
                      placeholder="Nhập bình luận của bạn..."
                      value={commentForm.content}
                      onChange={(e) =>
                        setCommentForm({ content: e.target.value })
                      }
                      rows={5}
                      className="w-full"
                    />
                  </div>

                  <Button
                    label={isCreatingComment ? "Đang gửi..." : "Gửi bình luận"}
                    icon="pi pi-send"
                    onClick={handleSubmitComment}
                    disabled={isCreatingComment}
                    className="w-full bg-teal-600 hover:bg-teal-700 border-teal-600"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            {blog.author && (
              <Card className="mb-6 border-0 shadow-sm">
                <LabelTag>Tác giả</LabelTag>
                <div className="flex items-center gap-4 mt-4">
                  <Avatar
                    image={`https://i.pravatar.cc/150?u=${blog.author.id}`}
                    size="xlarge"
                    shape="circle"
                  />
                  <div>
                    <h4 className="font-bold text-lg">
                      {blog.author.fullName || blog.author.username}
                    </h4>
                  </div>
                </div>
              </Card>
            )}

            {/* SEO Info Card */}
            {(blog.seoTitle || blog.seoDescription) && (
              <Card className="mb-6 border-0 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-teal-700">
                  Thông tin SEO
                </h3>
                {blog.seoTitle && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">SEO Title:</p>
                    <p className="font-medium">{blog.seoTitle}</p>
                  </div>
                )}
                {blog.seoDescription && (
                  <div>
                    <p className="text-sm text-gray-500">SEO Description:</p>
                    <p className="text-sm">{blog.seoDescription}</p>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
