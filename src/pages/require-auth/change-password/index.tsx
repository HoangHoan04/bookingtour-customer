import { useState } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { changePassword } from "@/services/auth.service";
import tokenCache from "@/utils/token-cache";
import { useRouter } from "@/routes/hooks";
import { useToast } from "@/context/ToastContext";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      if (res) {
        showToast({
          type: "success",
          title: "Thành công",
          message: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại.",
          timeout: 2000,
        });
        setTimeout(() => {
          tokenCache.clear();
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Lỗi",
        message: "Lỗi khi đổi mật khẩu. Vui lòng thử lại.",
        timeout: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ChangePasswordForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl p-8 shadow-sm ">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 surface-200">
              <i className="pi pi-lock text-2xl" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Đổi mật khẩu</h1>
            <p className="text-sm opacity-60">
              Cập nhật mật khẩu để bảo vệ tài khoản của bạn
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Current Password */}
            <div className="flex flex-col gap-1.5 p-fluid">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Mật khẩu hiện tại
              </label>
              <Password
                value={form.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
                toggleMask
                feedback={false}
                placeholder="Nhập mật khẩu hiện tại"
                className={classNames({ "p-invalid": errors.currentPassword })}
              />
              {errors.currentPassword && (
                <small className="p-error flex items-center gap-1">
                  <i className="pi pi-exclamation-circle text-xs" />
                  {errors.currentPassword}
                </small>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5 p-fluid">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Mật khẩu mới
              </label>
              <Password
                value={form.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                toggleMask
                placeholder="Nhập mật khẩu mới"
                promptLabel="Nhập mật khẩu mới"
                weakLabel="Yếu"
                mediumLabel="Trung bình"
                strongLabel="Mạnh"
                className={classNames({ "p-invalid": errors.newPassword })}
              />
              {errors.newPassword && (
                <small className="p-error flex items-center gap-1">
                  <i className="pi pi-exclamation-circle text-xs" />
                  {errors.newPassword}
                </small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5 p-fluid">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Xác nhận mật khẩu mới
              </label>
              <Password
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                toggleMask
                feedback={false}
                placeholder="Nhập lại mật khẩu mới"
                className={classNames({ "p-invalid": errors.confirmPassword })}
              />
              {errors.confirmPassword && (
                <small className="p-error flex items-center gap-1">
                  <i className="pi pi-exclamation-circle text-xs" />
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <Button
                label={loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              />
              <Button
                label="Quay lại"
                icon="pi pi-arrow-left"
                className="p-button-text w-full"
                onClick={() => router.back()}
                disabled={loading}
              />
            </div>
          </div>

          <p className="text-center text-xs mt-6 opacity-40">
            <i className="pi pi-info-circle mr-1" />
            Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại
          </p>
        </div>
      </div>
    </div>
  );
}
