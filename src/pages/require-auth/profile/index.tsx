import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { getMe, updateCustomer, updateAvatar } from "@/services/auth.service";
import tokenCache from "@/utils/token-cache";
import { useRouter } from "@/routes/hooks";
import { formatDateTime } from "@/common/helpers/format";
import { useUploadSingle } from "@/hooks/upload";
import GlobalLoading from "@/components/ui/loading";
import { useToast } from "@/context/ToastContext";

const GENDER_OPTIONS = [
  { label: "Nam", value: "MALE" },
  { label: "Nữ", value: "FEMALE" },
  { label: "Khác", value: "OTHER" },
];

const genderLabel: Record<string, string> = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

function InfoField({ icon, label, value, isEditing, children }: any) {
  return (
    <div className="flex flex-col gap-1.5 py-4 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-2 opacity-50">
        <i className={`pi ${icon} text-xs`} style={{ color: "#14b8a6" }} />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="pl-6">
        {isEditing ? (
          <div className="p-fluid mt-1">{children}</div>
        ) : (
          <span className="text-sm font-medium">{value || "—"}</span>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [showPreview, setShowPreview] = useState(false);
  const { uploadAsync, isLoading: isUploading } = useUploadSingle();
  const { showToast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMe();
      const userData = res.user ?? res;
      setUser(userData);
      setFormData(userData.customer || {});
    } catch (e) {
      console.error("Lỗi tải profile:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadRes = await uploadAsync(file);
      const newImageUrl = uploadRes.fileUrl;
      if (newImageUrl) {
        await updateAvatar(newImageUrl);
        setFormData((prev: any) => ({ ...prev, avatar: newImageUrl }));
        showToast({
          title: "Thành công",
          type: "success",
          message: "Cập nhật ảnh đại diện thành công!",
        });
      }
    } catch (err) {
      showToast({
        title: "Lỗi",
        type: "error",
        message: "Không thể tải ảnh lên!",
      });
    }
  };

  const handleSaveInfo = async () => {
    const customerId = user?.customer?.id;
    if (!customerId) return;

    try {
      setLoading(true);
      const payload = {
        id: customerId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender,
        address: formData.address,
        birthday:
          formData.birthday instanceof Date
            ? formData.birthday.toISOString()
            : formData.birthday,
      };

      const res = await updateCustomer(payload);
      if (res) {
        setIsEditing(false);
        await fetchProfile();
        showToast({
          title: "Thành công",
          type: "success",
          message: "Cập nhật thông tin thành công!",
        });
      }
    } catch (e: any) {
      showToast({
        title: "Lỗi",
        type: "error",
        message: "Không thể cập nhật thông tin!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    tokenCache.clear();
    window.location.href = "/";
  };

  if (loading && !user) return <GlobalLoading />;

  return (
    <div className="min-h-screen font-sans p-4 md:p-12">
      {loading && <GlobalLoading />}

      <div
        className={`max-w-6xl mx-auto ${loading ? "opacity-50 pointer-events-none" : ""}`}
      >
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Hồ sơ người dùng
            </h1>
            <p className="mt-2">Thông tin định danh và tùy chỉnh cá nhân</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                label="Chỉnh sửa"
                icon="pi pi-pencil"
                outlined
                severity="warning"
                onClick={() => setIsEditing(true)}
                size="small"
              />
            ) : (
              <>
                <Button
                  label="Hủy"
                  severity="danger"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(user.customer || {});
                  }}
                  size="small"
                />
                <Button
                  label="Lưu thay đổi"
                  icon="pi pi-check"
                  outlined
                  severity="success"
                  onClick={handleSaveInfo}
                  size="small"
                />
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-6">
            <div className="border border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm">
              <div className="relative mb-6 group">
                <div className="w-48 h-48 rounded-full border-4 border-teal-500/20 shadow-2xl overflow-hidden  flex items-center justify-center">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-4xl font-black text-teal-500 uppercase">
                      {formData.name?.[0] || user.username?.[0] || "U"}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {isUploading ? (
                    <i className="pi pi-spin pi-spinner text-2xl" />
                  ) : (
                    <>
                      <button
                        onClick={() => setShowPreview(true)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 transition-all flex items-center justify-center"
                        title="Xem ảnh lớn"
                      >
                        <i className="pi pi-search-plus text-lg" />
                      </button>
                      <button
                        onClick={handleAvatarClick}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 transition-all flex items-center justify-center"
                        title="Thay đổi ảnh"
                      >
                        <i className="pi pi-camera text-lg" />
                      </button>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-[#0b1120] rounded-full"></div>
              </div>

              <h2 className="text-2xl font-bold mb-1">
                {formData.name || user.username}
              </h2>
              <p className="text-teal-500/80 font-medium text-sm mb-6 italic">
                @{user.username}
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {user.isAdmin && (
                  <Tag
                    value="Admin"
                    className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3"
                  />
                )}
                <Tag
                  value={user.isActive ? "Hoạt động" : "Khóa"}
                  severity={user.isActive ? "success" : "danger"}
                  rounded
                />
              </div>

              <Divider className="my-8 opacity-5" />

              <div className="w-full text-left space-y-4">
                <p className="text-[10px] font-black uppercase  tracking-[0.2em] mb-4 text-center">
                  Quyền hạn hệ thống
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {user.roles?.map((role: any) => (
                    <div
                      key={role.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/5"
                    >
                      <i className="pi pi-shield text-teal-500 text-xs" />
                      <span className="text-xs font-semibold">{role.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="border border-white/5 rounded-[32px] p-8 md:p-10 shadow-xl backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
                  <i className="pi pi-id-card text-sm" />
                </span>
                Thông tin khách hàng
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <InfoField
                  icon="pi-user"
                  label="Họ tên đầy đủ"
                  value={formData.name}
                  isEditing={isEditing}
                >
                  <InputText
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-lg"
                  />
                </InfoField>

                <InfoField
                  icon="pi-phone"
                  label="Số điện thoại"
                  value={formData.phone}
                  isEditing={isEditing}
                >
                  <InputText
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-lg"
                  />
                </InfoField>

                <InfoField
                  icon="pi-envelope"
                  label="Email định danh"
                  value={user.email}
                  isEditing={false}
                />

                <InfoField
                  icon="pi-venus-mars"
                  label="Giới tính"
                  value={genderLabel[formData.gender]}
                  isEditing={isEditing}
                >
                  <Dropdown
                    value={formData.gender}
                    options={GENDER_OPTIONS}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.value })
                    }
                    className="bg-white/5 border-white/10 rounded-lg"
                    placeholder="Chọn giới tính"
                  />
                </InfoField>

                <InfoField
                  icon="pi-calendar"
                  label="Ngày sinh"
                  value={
                    formData.birthday
                      ? new Date(formData.birthday).toLocaleDateString("vi-VN")
                      : ""
                  }
                  isEditing={isEditing}
                >
                  <Calendar
                    value={
                      formData.birthday ? new Date(formData.birthday) : null
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, birthday: e.value })
                    }
                    className="bg-white/5 border-white/10"
                    dateFormat="dd/mm/yy"
                    showIcon
                  />
                </InfoField>

                <InfoField
                  icon="pi-map-marker"
                  label="Địa chỉ cư trú"
                  value={formData.address}
                  isEditing={isEditing}
                >
                  <InputText
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-lg"
                  />
                </InfoField>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase  font-bold mb-1">
                      Mã khách hàng
                    </span>
                    <span className="text-sm font-mono text-teal-400 uppercase tracking-widest">
                      {user.customer?.code || "N/A"}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase  font-bold mb-1">
                      Tham gia hệ thống
                    </span>
                    <span className="text-sm">
                      {formatDateTime(user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between px-4">
          <Button
            label="Quay lại"
            icon="pi pi-arrow-left"
            severity="info"
            outlined
            onClick={() => router.back()}
            size="small"
          />
          <Button
            label="Đăng xuất"
            icon="pi pi-power-off"
            severity="danger"
            onClick={handleLogout}
            size="small"
          />
        </div>
      </div>

      <Dialog
        header="Ảnh đại diện"
        visible={showPreview}
        onHide={() => setShowPreview(false)}
        maximizable
        modal
        dismissableMask
        style={{ width: "500px" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        contentClassName="flex justify-center items-center p-0 bg-black overflow-hidden"
      >
        {formData.avatar ? (
          <img
            src={formData.avatar}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain"
          />
        ) : (
          <div className="p-10 ">Người dùng chưa cập nhật ảnh</div>
        )}
      </Dialog>
    </div>
  );
}
