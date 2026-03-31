import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputOtp } from "primereact/inputotp";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import { useState } from "react";

export default function ForgotPasswordModal({
  visible,
  onHide,
  onSwitchToLogin,
}: {
  visible: boolean;
  onHide: () => void;
  onSwitchToLogin: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    contact: "",
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    contact: "",
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const stepItems = [
    { label: "Xác minh" },
    { label: "OTP" },
    { label: "Đổi mật khẩu" },
  ];

  const hideScrollbarClass =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  const validateStep0 = () => {
    if (!formData.contact.trim()) {
      setErrors({
        ...errors,
        contact: "Vui lòng nhập Email hoặc Số điện thoại",
      });
      return false;
    }
    setErrors({ ...errors, contact: "" });
    return true;
  };

  const validateStep2 = () => {
    let isValid = true;
    const newErrors = { ...errors, newPassword: "", confirmPassword: "" };

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendOTP = () => {
    if (!validateStep0()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveStep(1);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (formData.otpCode.length < 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveStep(2);
    }, 1000);
  };

  const handleResetPassword = () => {
    if (!validateStep2()) return;
  };

  const handleClose = () => {
    setActiveStep(0);
    setFormData({
      contact: "",
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({
      contact: "",
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
    });
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={handleClose}
      modal
      dismissableMask={false}
      showHeader={false}
      contentClassName="!p-0!overflow-hidden"
      className="w-full max-w-md mx-4 shadow-2xl rounded-2xl"
    >
      <div
        className={`relative flex flex-col bg-(--surface-overlay) text-(--text-color) max-h-[90vh] overflow-y-auto ${hideScrollbarClass}`}
      >
        <div className="sticky top-0 right-0 z-20 flex justify-end p-3 pointer-events-none">
          <Button
            icon="pi pi-times"
            rounded
            text
            className="w-8! h-8! text-(--text-color-secondary) bg-(--surface-overlay) shadow-md pointer-events-auto hover:bg-(--surface-hover)"
            onClick={handleClose}
          />
        </div>

        <div className="-mt-11 text-center pt-8 pb-4 px-8 ">
          <h3 className="text-2xl font-bold m-0 mb-1">Quên mật khẩu?</h3>
          <p className="text-sm text-(--text-color-secondary) mb-4">
            {activeStep === 0 && "Nhập thông tin để tìm lại tài khoản"}
            {activeStep === 1 && "Nhập mã xác thực chúng tôi vừa gửi"}
            {activeStep === 2 && "Thiết lập mật khẩu mới cho tài khoản"}
          </p>

          <Steps
            model={stepItems}
            activeIndex={activeStep}
            className="custom-steps-small scale-90 origin-center"
            readOnly
          />
        </div>

        <div className="px-8 pb-8 pt-6 flex-1 flex flex-col min-h-50">
          {activeStep === 0 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact" className="text-sm font-medium">
                  Email hoặc Số điện thoại
                </label>
                <div className="relative">
                  <IconField iconPosition="left" className="w-full">
                    <InputText
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="example@gmail.com hoặc 0912..."
                      className={`w-full pl-10 py-3 bg-(--surface-ground) border-(--surface-border) hover:border-(--primary-color) focus:border-(--primary-color) focus:shadow-none transition-colors rounded-lg ${
                        errors.contact ? "p-invalid border-red-500!" : ""
                      }`}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                    />
                  </IconField>
                </div>
                {errors.contact && (
                  <small className="text-red-500">{errors.contact}</small>
                )}
              </div>

              <Button
                label={loading ? "Đang gửi mã..." : "Gửi mã xác thực"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                iconPos="right"
                className="w-full py-3 mt-2 justify-center font-bold shadow-lg shadow-blue-500/20"
                onClick={handleSendOTP}
                disabled={loading}
              />

              <div className="text-center mt-2">
                <span
                  className="text-sm font-bold text-(--text-color-secondary) cursor-pointer hover:text-(--primary-color) transition-colors"
                  onClick={onSwitchToLogin}
                >
                  <i className="pi pi-arrow-left mr-1 text-xs"></i> Quay lại
                  đăng nhập
                </span>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="flex flex-col items-center gap-6 animate-fade-in">
              <div className="text-center">
                <p className="text-sm text-(--text-color-secondary)">
                  Mã OTP 6 số đã được gửi qua Zalo/Email tới: <br />
                  <b className="text-(--text-color)">{formData.contact}</b>
                </p>
              </div>

              <InputOtp
                value={formData.otpCode}
                onChange={(e) =>
                  setFormData({ ...formData, otpCode: e.value as string })
                }
                length={6}
                integerOnly
              />

              <div className="flex flex-col gap-3 w-full">
                <Button
                  label={loading ? "Đang xác thực..." : "Xác thực"}
                  className="w-full py-3 justify-center font-bold shadow-lg shadow-blue-500/20"
                  onClick={handleVerifyOTP}
                  disabled={loading || formData.otpCode.length < 6}
                />
                <Button
                  label="Gửi lại mã"
                  link
                  className="w-full text-sm"
                  onClick={() => {}}
                />
                <Button
                  label="Quay lại bước trước"
                  outlined
                  className="w-full py-2 justify-center text-sm"
                  onClick={() => setActiveStep(0)}
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Mật khẩu mới</label>
                <div className="relative">
                  <IconField iconPosition="left" className="w-full">
                    <InputText
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Nhập mật khẩu mới"
                      className={`w-full pl-10 pr-10 py-3 bg-(--surface-ground) border-(--surface-border) rounded-lg ${
                        errors.newPassword ? "p-invalid border-red-500!" : ""
                      }`}
                    />
                  </IconField>

                  <i
                    className={`pi ${
                      showPassword ? "pi-eye-slash" : "pi-eye"
                    } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-color-secondary) hover:text-(--text-color)`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {errors.newPassword && (
                  <small className="text-red-500">{errors.newPassword}</small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Xác nhận mật khẩu</label>
                <div className="relative">
                  <IconField iconPosition="left" className="w-full">
                    <InputText
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Nhập lại mật khẩu mới"
                      className={`w-full pl-10 pr-10 py-3 bg-(--surface-ground) border-(--surface-border) rounded-lg ${
                        errors.confirmPassword
                          ? "p-invalid border-red-500!"
                          : ""
                      }`}
                    />
                  </IconField>
                </div>
                {errors.confirmPassword && (
                  <small className="text-red-500">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              <Button
                label={loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check-circle"}
                className="w-full py-3 mt-2 justify-center font-bold shadow-lg"
                onClick={handleResetPassword}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
