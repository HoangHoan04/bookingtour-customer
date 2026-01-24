import LoginModal from "@/components/auth/LoginForm";
import RegisterModal from "@/components/auth/RegisterFrom";
import LabelTag from "@/components/ui/LabelTag";
import Title from "@/components/ui/Tilte";
import {
  useBlogBySlug,
  useBlogComments,
  useCreateBlogComment,
  useLikeBlog,
  useRelatedBlogs,
} from "@/hooks/blog";
import { useRouter } from "@/routes/hooks/use-router";
import tokenCache from "@/utils/token-cache";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetailScreen() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const { data: blog, isLoading } = useBlogBySlug(slug);
  const { likeBlog, isLoading: isLiking } = useLikeBlog();
  const { createComment, isLoading: isCreatingComment } =
    useCreateBlogComment();

  const [commentForm, setCommentForm] = useState({
    content: "",
  });
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [isLoggedIn] = useState(() => tokenCache.isAuthenticated());

  const {
    data: comments,
    refetch: refetchComments,
    isLoading: isLoadingComments,
  } = useBlogComments(blog?.id, {
    skip: 0,
    take: 100,
  });

  const { data: relatedBlogs } = useRelatedBlogs(blog?.id, 3);

  const handleSubmitComment = () => {
    if (!isLoggedIn) {
      toast.current?.show({
        severity: "warn",
        summary: "Yêu cầu đăng nhập",
        detail: "Bạn cần đăng nhập để bình luận",
        life: 3000,
      });
      setLoginVisible(true);
      return;
    }

    if (!commentForm.content.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Thông báo",
        detail: "Vui lòng nhập nội dung bình luận!",
        life: 3000,
      });
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
          toast.current?.show({
            severity: "success",
            summary: "Thành công",
            detail:
              "Cảm ơn bạn đã bình luận! Bình luận của bạn đang chờ duyệt.",
            life: 3000,
          });
        },
        onError: () => {
          toast.current?.show({
            severity: "error",
            summary: "Lỗi",
            detail: "Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại!",
            life: 3000,
          });
        },
      },
    );
  };

  const handleLikeBlog = () => {
    if (!isLoggedIn) {
      toast.current?.show({
        severity: "warn",
        summary: "Yêu cầu đăng nhập",
        detail: "Bạn cần đăng nhập để thích bài viết",
        life: 3000,
      });
      setLoginVisible(true);
      return;
    }

    if (!blog?.id) return;
    likeBlog(blog.id);
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
      <div className="min-h-screen bg-gray-50">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <Button
            label="Quay lại danh sách"
            icon="pi pi-arrow-left"
            onClick={() => router.push("/blogs")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="text-center mb-6">
              <Title>{blog.title}</Title>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="relative mb-6">
                <Image
                  src={blog.featuredImage.fileUrl}
                  alt={blog.title}
                  className="w-full"
                  imageClassName="w-full h-96 object-cover rounded-2xl"
                  preview
                />
              </div>
            )}

            {/* Article Meta */}
            <Card className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1">
                    <i className="pi pi-user"></i>
                    <span>
                      {blog.author?.fullName ||
                        blog.author?.username ||
                        "Admin"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="pi pi-calendar"></i>
                    <span>
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </span>
                  </span>
                  {blog.category && (
                    <span className="flex items-center gap-1">
                      <i className="pi pi-tag"></i>
                      <span>{blog.category}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <i className="pi pi-eye"></i>
                    <span>{blog.viewCount || 0} lượt xem</span>
                  </span>
                </div>

                <Button
                  label={`${blog.likeCount || 0} Thích`}
                  icon="pi pi-heart"
                  onClick={handleLikeBlog}
                  loading={isLiking}
                  severity="danger"
                  outlined
                />
              </div>
            </Card>

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <p className="text-gray-800 italic">{blog.excerpt}</p>
              </div>
            )}

            <Divider />

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8 bg-white p-6 rounded-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <Card className="mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-semibold">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, index: number) => (
                      <Tag key={index} value={tag} severity="info" />
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Share Buttons */}
            <Card className="mb-8">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Chia sẻ bài viết:</span>
                <div className="flex gap-2">
                  <Button
                    icon="pi pi-facebook"
                    rounded
                    className="w-10 h-10 bg-blue-600 border-blue-600"
                  />
                  <Button
                    icon="pi pi-twitter"
                    rounded
                    className="w-10 h-10 bg-blue-400 border-blue-400"
                  />
                  <Button
                    icon="pi pi-linkedin"
                    rounded
                    className="w-10 h-10 bg-blue-700 border-blue-700"
                  />
                  <Button
                    icon="pi pi-link"
                    rounded
                    outlined
                    className="w-10 h-10"
                  />
                </div>
              </div>
            </Card>

            {/* Comments Section */}
            <div className="mb-8">
              <LabelTag>Bình luận ({comments.length})</LabelTag>

              {isLoadingComments ? (
                <div className="space-y-4 mt-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <div className="flex gap-4">
                        <Skeleton shape="circle" size="3rem" />
                        <div className="flex-1">
                          <Skeleton width="30%" className="mb-2" />
                          <Skeleton width="100%" height="3rem" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {comments.map((comment: any) => (
                    <Card key={comment.id} className="shadow-sm">
                      <div className="flex gap-4">
                        <Avatar
                          image={`https://i.pravatar.cc/150?u=${comment.customer?.id}`}
                          size="large"
                          shape="circle"
                        />
                        <div className="flex-1">
                          <div className="mb-2">
                            <h4 className="font-bold">
                              {comment.customer?.fullName ||
                                comment.customer?.username ||
                                "Người dùng"}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 ml-8 space-y-3">
                              {comment.replies.map((reply: any) => (
                                <div key={reply.id} className="flex gap-3">
                                  <Avatar
                                    image={`https://i.pravatar.cc/150?u=${reply.customer?.id}`}
                                    size="normal"
                                    shape="circle"
                                  />
                                  <div className="flex-1 bg-gray-50 p-3 rounded">
                                    <h5 className="font-semibold text-sm">
                                      {reply.customer?.fullName ||
                                        reply.customer?.username ||
                                        "Người dùng"}
                                    </h5>
                                    <p className="text-xs text-gray-500 mb-1">
                                      {formatDate(reply.createdAt)}
                                    </p>
                                    <p className="text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="pi pi-comments text-4xl mb-2"></i>
                  <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                </div>
              )}
            </div>

            {/* Comment Form */}
            <Card className="shadow-lg">
              <LabelTag>Viết bình luận</LabelTag>
              <p className="mb-4 text-gray-600">
                Hãy chia sẻ suy nghĩ của bạn về bài viết này
              </p>

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
                  disabled={isCreatingComment || !commentForm.content.trim()}
                  className="w-full bg-teal-600 hover:bg-teal-700 border-teal-600"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            {blog.author && (
              <Card className="mb-6 shadow-sm">
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
                    <p className="text-sm text-gray-500">Tác giả</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Related Posts */}
            {relatedBlogs && relatedBlogs.length > 0 && (
              <Card className="mb-6 shadow-sm">
                <LabelTag>Bài viết liên quan</LabelTag>
                <div className="space-y-4 mt-4">
                  {relatedBlogs.map((relatedBlog: any) => (
                    <div
                      key={relatedBlog.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => router.push(`/blogs/${relatedBlog.slug}`)}
                    >
                      {relatedBlog.featuredImage && (
                        <img
                          src={relatedBlog.featuredImage.fileUrl}
                          alt={relatedBlog.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm line-clamp-2 mb-1">
                          {relatedBlog.title}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {formatDate(
                            relatedBlog.publishedAt || relatedBlog.createdAt,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* SEO Info */}
            {(blog.seoTitle || blog.seoDescription) && (
              <Card className="mb-6 shadow-sm">
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

      {/* Login/Register Modals */}
      <LoginModal
        visible={loginVisible}
        onHide={() => setLoginVisible(false)}
        onSwitchToRegister={() => {
          setLoginVisible(false);
          setRegisterVisible(true);
        }}
        onSwitchToForgotPassword={() => {
          setLoginVisible(false);
        }}
      />

      <RegisterModal
        visible={registerVisible}
        onHide={() => setRegisterVisible(false)}
        onSwitchToLogin={() => {
          setRegisterVisible(false);
          setLoginVisible(true);
        }}
      />
    </div>
  );
}
