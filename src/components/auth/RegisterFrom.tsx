import { FacebookIcon, GoogleIcon, ZaloIcon } from "@/assets/icons";
import { useToast } from "@/context/ToastContext";
import {
  loginNormal,
  registerCustomer,
  sendOtpCustomer,
} from "@/services/auth.service";
import tokenCache from "@/utils/token-cache";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputOtp } from "primereact/inputotp";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Steps } from "primereact/steps";
import { useState } from "react";

const SocialButton = ({ icon, label }: { icon: string; label: string }) => (
  <button
    type="button"
    className="flex-1 flex items-center justify-center gap-2 p-3 
                bg-[--surface-ground] hover:bg-[--surface-hover] 
                border border-[--surface-border] rounded-lg 
                transition-all duration-200 active:scale-95 group"
  >
    <img
      src={icon}
      alt={label}
      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
    />
  </button>
);

export default function RegisterModal({
  visible,
  onHide,
  onSwitchToLogin,
}: {
  visible: boolean;
  onHide: () => void;
  onSwitchToLogin: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    sendMethod: "EMAIL",
    otpCode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const stepItems = [{ label: "Thông tin" }, { label: "Xác thực OTP" }];

  const hideScrollbarClass =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!registerData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
      isValid = false;
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!registerData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      isValid = false;
    } else if (!phoneRegex.test(registerData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!emailRegex.test(registerData.email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    if (!registerData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (registerData.password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
      isValid = false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const method = registerData.sendMethod === "phone" ? "ZALO" : "EMAIL";
      const payload = {
        phone: registerData.phone,
        email: registerData.email,
        sendMethod: method,
      };

      const res = await sendOtpCustomer(payload);

      if (res) {
        showToast({
          type: "success",
          title: "Thành công",
          message: `Mã OTP đã được gửi qua ${
            registerData.sendMethod === "phone" ? "Zalo" : "Email"
          }`,
          timeout: 3000,
        });
        setActiveStep(1);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Không thể gửi OTP. Vui lòng thử lại.";
      showToast({
        type: "error",
        title: "Lỗi",
        message: message,
        timeout: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerData.otpCode || registerData.otpCode.length < 6) {
      showToast({
        type: "warn",
        title: "Cảnh báo",
        message: "Vui lòng nhập đủ 6 số OTP",
      });
      return;
    }

    setLoading(true);
    try {
      const method = registerData.sendMethod === "phone" ? "ZALO" : "EMAIL";

      const payload = {
        name: registerData.name,
        phone: registerData.phone,
        email: registerData.email,
        gender: registerData.gender,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        sendMethod: method,
        otpCode: registerData.otpCode,
      };

      await registerCustomer(payload);
      const loginPayload = {
        username: registerData.phone,
        password: registerData.password,
      };

      const loginRes = await loginNormal(loginPayload);

      if (loginRes && loginRes.accessToken) {
        tokenCache.setAuthData(
          loginRes.accessToken,
          loginRes.refreshToken,
          loginRes.user
        );

        showToast({
          type: "success",
          title: "Đăng ký thành công",
          message: "Chào mừng bạn đến với HimLamTourist!",
          timeout: 2000,
        });

        handleModalHide();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        (Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");

      showToast({
        type: "error",
        title: "Lỗi đăng ký",
        message: message,
        timeout: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalHide = () => {
    setActiveStep(0);
    setRegisterData({
      name: "",
      phone: "",
      email: "",
      gender: "male",
      password: "",
      confirmPassword: "",
      sendMethod: "phone",
      otpCode: "",
    });
    setErrors({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    onHide();
  };

  return (
    <>
      <Dialog
        visible={visible}
        onHide={handleModalHide}
        modal
        dismissableMask={false}
        showHeader={false}
        contentClassName="!p-0  !overflow-hidden"
        className="w-full max-w-2xl mx-4 shadow-2xl rounded-2xl"
      >
        <div
          className={`relative flex flex-col bg-[--surface-overlay] text-[--text-color] max-h-[90vh] overflow-y-auto ${hideScrollbarClass}`}
        >
          <div className="sticky top-0 right-0 z-20 flex justify-end p-3 pointer-events-none">
            <Button
              icon="pi pi-times"
              rounded
              text
              className="w-8! h-8! text-[--text-color-secondary] bg-[--surface-overlay] shadow-md pointer-events-auto hover:bg-[--surface-hover]"
              onClick={handleModalHide}
            />
          </div>

          <div className="-mt-11 text-center pt-8 pb-2 px-8 bg-[--surface-ground]/50">
            <h3 className="text-2xl font-bold m-0 mb-1">Đăng ký tài khoản</h3>
            <p className="text-sm text-[--text-color-secondary] mb-6">
              Tham gia NaohShop ngay hôm nay
            </p>

            <Steps
              model={stepItems}
              activeIndex={activeStep}
              className="custom-steps max-w-md mx-auto"
              readOnly
            />
          </div>

          <div className="px-8 pb-8 pt-6 flex-1 flex flex-col">
            {activeStep === 0 && (
              <div className="flex flex-col gap-5 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IconField iconPosition="left" className="w-full">
                      <InputIcon className="pi pi-user" />
                      <InputText
                        id="name"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Vui lòng nhập họ và tên"
                        className={`w-full pl-10 py-3 bg-[--surface-ground] border-[--surface-border] hover:border-[--primary-color] focus:border-[--primary-color] focus:shadow-none transition-colors rounded-lg ${
                          errors.name ? "p-invalid border-red-500!" : ""
                        }`}
                      />
                    </IconField>
                  </div>
                  {errors.name && (
                    <small className="text-red-500">{errors.name}</small>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IconField iconPosition="left" className="w-full">
                        <InputIcon className="pi pi-phone" />
                        <InputText
                          id="phone"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              phone: e.target.value,
                            })
                          }
                          keyfilter="int"
                          placeholder="Vui lòng nhập số điện thoại"
                          className={`w-full pl-10 py-3 bg-[--surface-ground] border-[--surface-border] rounded-lg ${
                            errors.phone ? "p-invalid border-red-500!" : ""
                          }`}
                        />
                      </IconField>
                    </div>
                    {errors.phone && (
                      <small className="text-red-500">{errors.phone}</small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IconField iconPosition="left" className="w-full">
                        <InputIcon className="pi pi-envelope" />
                        <InputText
                          id="email"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                          placeholder="Vui lòng nhập email"
                          className={`w-full pl-10 py-3 bg-[--surface-ground] border-[--surface-border] rounded-lg ${
                            errors.email ? "p-invalid border-red-500!" : ""
                          }`}
                        />
                      </IconField>
                    </div>
                    {errors.email && (
                      <small className="text-red-500">{errors.email}</small>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Giới tính</span>
                  <div className="flex gap-6 p-3 bg-[--surface-ground] rounded-lg border border-[--surface-border]">
                    {[
                      { value: "male", label: "Nam", icon: "pi-mars" },
                      { value: "female", label: "Nữ", icon: "pi-venus" },
                      { value: "other", label: "Khác", icon: "pi-user" },
                    ].map((g) => (
                      <div
                        key={g.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioButton
                          inputId={g.value}
                          value={g.value}
                          checked={registerData.gender === g.value}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              gender: e.value,
                            })
                          }
                        />
                        <label
                          htmlFor={g.value}
                          className="cursor-pointer text-sm flex items-center gap-1"
                        >
                          <i className={`pi ${g.icon} text-xs opacity-70`}></i>{" "}
                          {g.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IconField iconPosition="left" className="w-full">
                        <InputIcon className="pi pi-lock" />
                        <InputText
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Vui lòng nhập mật khẩu"
                          className={`w-full pl-10 pr-10 py-3 bg-[--surface-ground] border-[--surface-border] rounded-lg ${
                            errors.password ? "p-invalid border-red-500!" : ""
                          }`}
                        />
                      </IconField>
                      <i
                        className={`pi ${
                          showPassword ? "pi-eye-slash" : "pi-eye"
                        } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[--text-color-secondary] hover:text-[--text-color]`}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                    {errors.password && (
                      <small className="text-red-500">{errors.password}</small>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      Nhập lại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IconField iconPosition="left" className="w-full">
                        <InputIcon className="pi pi-lock" />
                        <InputText
                          type={showPassword ? "text" : "password"}
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Vui lòng nhập lại mật khẩu"
                          className={`w-full pl-10 pr-10 py-3 bg-[--surface-ground] border-[--surface-border] rounded-lg ${
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
                </div>

                <div className="flex flex-col gap-2 mt-1">
                  <span className="text-sm font-medium">Nhận OTP qua:</span>
                  <div className="flex gap-4">
                    <div
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all flex-1 ${
                        registerData.sendMethod === "phone"
                          ? "border-[--primary-color] bg-blue-50 dark:bg-blue-900/20"
                          : "border-[--surface-border]"
                      }`}
                      onClick={() =>
                        setRegisterData({
                          ...registerData,
                          sendMethod: "phone",
                        })
                      }
                    >
                      <RadioButton
                        inputId="otp-phone"
                        value="phone"
                        checked={registerData.sendMethod === "phone"}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            sendMethod: e.value,
                          })
                        }
                      />
                      <label
                        htmlFor="otp-phone"
                        className="cursor-pointer text-sm font-medium"
                      >
                        <i className="pi pi-mobile mr-1"></i> SMS/Zalo
                      </label>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all flex-1 ${
                        registerData.sendMethod === "email"
                          ? "border-[--primary-color] bg-blue-50 dark:bg-blue-900/20"
                          : "border-[--surface-border]"
                      }`}
                      onClick={() =>
                        setRegisterData({
                          ...registerData,
                          sendMethod: "email",
                        })
                      }
                    >
                      <RadioButton
                        inputId="otp-email"
                        value="email"
                        checked={registerData.sendMethod === "email"}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            sendMethod: e.value,
                          })
                        }
                      />
                      <label
                        htmlFor="otp-email"
                        className="cursor-pointer text-sm font-medium"
                      >
                        <i className="pi pi-envelope mr-1"></i> Email
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  label={loading ? "Đang xử lý..." : "Tiếp tục xác thực"}
                  icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
                  iconPos="right"
                  className="w-full py-3 mt-2 justify-center font-bold text-base shadow-lg shadow-blue-500/20"
                  onClick={handleSendOTP}
                  disabled={loading}
                />

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[--surface-border]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[--surface-overlay] px-2 text-[--text-color-secondary]">
                      Hoặc tiếp tục với
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <SocialButton icon={GoogleIcon} label="Google" />
                  <SocialButton icon={FacebookIcon} label="Facebook" />
                  <SocialButton icon={ZaloIcon} label="Zalo" />
                </div>

                <div className="text-center mt-2">
                  <span className="text-sm text-[--text-color-secondary]">
                    Đã có tài khoản?{" "}
                  </span>
                  <span
                    className="text-sm font-bold text-[--primary-color] cursor-pointer hover:underline"
                    onClick={() => {
                      handleModalHide();
                      onSwitchToLogin();
                    }}
                  >
                    Đăng nhập
                  </span>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex flex-col items-center justify-center flex-1 gap-6 animate-fade-in py-8">
                <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-2 shadow-inner">
                  <i className="pi pi-lock text-5xl text-blue-500"></i>
                </div>

                <div className="text-center max-w-xs">
                  <h3 className="font-bold text-xl mb-2">Nhập mã xác thực</h3>
                  <p className="text-sm text-[--text-color-secondary]">
                    Mã 6 số đã được gửi tới{" "}
                    <b>
                      {registerData.sendMethod === "phone"
                        ? registerData.phone
                        : registerData.email}
                    </b>
                  </p>
                </div>

                <div className="my-4">
                  <InputOtp
                    value={registerData.otpCode}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        otpCode: e.value as string,
                      })
                    }
                    length={6}
                    integerOnly
                  />
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Button
                    label={loading ? "Đang xử lý..." : "Hoàn tất đăng ký"}
                    icon={
                      loading ? "pi pi-spin pi-spinner" : "pi pi-check-circle"
                    }
                    className="w-full py-3 justify-center font-bold shadow-lg shadow-green-500/20"
                    onClick={handleRegister}
                    disabled={
                      loading ||
                      !registerData.otpCode ||
                      registerData.otpCode.length < 6
                    }
                  />
                  <Button
                    label="Gửi lại mã"
                    icon="pi pi-refresh"
                    text
                    className="w-full py-2 justify-center text-sm"
                    onClick={handleSendOTP}
                    disabled={loading}
                  />
                  <Button
                    label="Quay lại"
                    icon="pi pi-arrow-left"
                    outlined
                    className="w-full py-2 justify-center text-sm"
                    onClick={() => setActiveStep(0)}
                    disabled={loading}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
