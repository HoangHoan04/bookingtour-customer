import { FacebookIcon, GoogleIcon } from "@/assets/icons";
import { useToast } from "@/context/ToastContext";
import {
  getMe,
  loginNormal,
  loginWithFacebook,
  loginWithGoogle,
} from "@/services/auth.service";
import tokenCache from "@/utils/token-cache";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const SocialButton = ({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-2 p-3 
                 bg-[--surface-ground] hover:bg-[--surface-hover] 
                 border border-[--surface-border] rounded-lg 
                 transition-all duration-200 active:scale-95 group cursor-pointer"
  >
    <img
      src={icon}
      alt={label}
      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
    />
  </button>
);

export default function LoginModal({
  visible,
  onHide,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}: {
  visible: boolean;
  onHide: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { showToast } = useToast();
  const handleLoginSuccess = async (data: any) => {
    if (data?.accessToken) {
      tokenCache.setAuthData(data.accessToken, data.refreshToken, data.user);

      try {
        const userInfoRes = await getMe();
        if (userInfoRes?.user) {
          tokenCache.updateUser(userInfoRes.user);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      }

      showToast({
        type: "success",
        title: "Thành công",
        message: "Đăng nhập thành công",
      });

      setTimeout(() => {
        onHide();
        window.location.reload();
      }, 800);
    }
  };

  const responseFacebook = async (response: any) => {
    if (response?.accessToken) {
      try {
        setLoading(true);
        const res = await loginWithFacebook(response.accessToken);
        if (res && res.accessToken) {
          handleLoginSuccess(res);
        } else {
          showToast({
            type: "error",
            title: "Lỗi",
            message: "Không thể đăng nhập với Facebook",
          });
        }
      } catch (error: any) {
        showToast({
          type: "error",
          title: `Lỗi Facebook ${error?.response?.status || ""}`,
          message: "Đăng nhập Facebook thất bại",
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("User cancelled login or error occured");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập tài khoản";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      valid = false;
    }
    setErrors(newErrors);

    if (!valid) return;

    setLoading(true);
    try {
      const res = await loginNormal({ username, password });
      if (res && res.accessToken) {
        handleLoginSuccess(res);
      } else {
        showToast({
          type: "error",
          title: "Lỗi",
          message: res?.message || "Đăng nhập thất bại",
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Lỗi",
        message: error?.response?.data?.message || "Có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await loginWithGoogle(tokenResponse.access_token);
        if (res && res.accessToken) handleLoginSuccess(res);
      } catch (error: any) {
        showToast({
          type: "error",
          title: `Lỗi Google ${error?.response?.status || ""}`,
          message: "Đăng nhập Google thất bại",
        });
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  // const handleZaloLogin = () => {
  //   const ZALO_APP_ID = import.meta.env.VITE_ZALO_APP_ID;
  //   const REDIRECT_URI = window.location.origin + "/zalo-callback";
  //   const zaloAuthUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${ZALO_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${Date.now()}`;
  //   const width = 600;
  //   const height = 600;
  //   const left = window.screen.width / 2 - width / 2;
  //   const top = window.screen.height / 2 - height / 2;
  //   const popup = window.open(
  //     zaloAuthUrl,
  //     "Zalo Login",
  //     `width=${width},height=${height},top=${top},left=${left}`,
  //   );
  //   const messageListener = async (event: MessageEvent) => {
  //     if (event.data?.type === "ZALO_AUTH_CODE") {
  //       const code = event.data.code;
  //       window.removeEventListener("message", messageListener);
  //       try {
  //         const res = await loginWithZalo(code);
  //         if (res && res.accessToken) handleLoginSuccess(res);
  //       } catch (error: any) {
  //         showToast({
  //           type: "error",
  //           title: "Lỗi Zalo",
  //           message: error?.response?.data?.message || "Lỗi đăng nhập Zalo",
  //         });
  //       }
  //     }
  //   };
  //   window.addEventListener("message", messageListener);
  // };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      dismissableMask={false}
      showHeader={false}
      contentClassName="!p-0 !overflow-hidden"
      className="w-full max-w-md mx-4 shadow-2xl overflow-hidden"
    >
      <div className="relative flex flex-col bg-[--surface-overlay] text-[--text-color]">
        <Button
          icon="pi pi-times"
          rounded
          text
          className="absolute! top-3 right-3 z-10 w-8! h-8! text-[--text-color-secondary] hover:bg-[--surface-hover]"
          onClick={onHide}
        />

        <div className="text-center pt-8 pb-4 px-8">
          <h3 className="text-2xl font-bold m-0 mb-1">Đăng nhập</h3>
          <p className="text-sm text-[--text-color-secondary]">
            Chào mừng bạn quay trở lại với NaohShop!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 pb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Tên đăng nhập
            </label>
            <IconField iconPosition="left">
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email hoặc số điện thoại"
                className={`${errors.username ? "p-invalid border-red-500" : ""}`}
              />
            </IconField>
            {errors.username && (
              <small className="text-red-500">{errors.username}</small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </label>
              <span
                className="text-xs font-semibold text-[--primary-color] hover:underline cursor-pointer"
                onClick={() => {
                  onHide();
                  onSwitchToForgotPassword();
                }}
              >
                Quên mật khẩu?
              </span>
            </div>
            <IconField iconPosition="left" className="w-full">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className={`w-full px-10 py-3 ${
                  errors.password ? "p-invalid border-red-500" : ""
                }`}
              />
              <i
                className={`pi ${
                  showPassword ? "pi-eye-slash" : "pi-eye"
                } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[--text-color-secondary]`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </IconField>
            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Checkbox
              inputId="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.checked || false)}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm cursor-pointer select-none text-[--text-color-secondary]"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>

          <Button
            label={loading ? "Đang xử lý..." : "Đăng nhập"}
            icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
            iconPos="right"
            disabled={loading}
            className="w-full py-3 font-bold rounded-lg shadow-lg"
            onClick={handleSubmit}
          />

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--surface-border)"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-(--surface-overlay) px-2 text-(--text-color-secondary)">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <SocialButton
              icon={GoogleIcon}
              label="Google"
              onClick={() => handleGoogleLogin()}
            />

            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID}
              scope="public_profile,email"
              onSuccess={(response) => {
                responseFacebook(response);
              }}
              onFail={(error) => {
                console.log("Facebook login failed:", error);
              }}
              onProfileSuccess={(profile) => {
                console.log("Profile:", profile);
              }}
              render={({ onClick }) => (
                <SocialButton
                  icon={FacebookIcon}
                  label="Facebook"
                  onClick={onClick}
                />
              )}
            />

            {/* <SocialButton
              icon={ZaloIcon}
              label="Zalo"
              onClick={handleZaloLogin}
            /> */}
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-[--text-color-secondary]">
              Chưa có tài khoản?{" "}
            </span>
            <span
              className="text-sm font-bold text-[--primary-color] cursor-pointer hover:underline"
              onClick={() => {
                onHide();
                onSwitchToRegister();
              }}
            >
              Đăng ký ngay
            </span>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
