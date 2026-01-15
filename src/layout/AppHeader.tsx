import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import ForgotPasswordModal from "@/components/auth/ForgotPaswordForm";
import LoginModal from "@/components/auth/LoginForm";
import RegisterModal from "@/components/auth/RegisterFrom";
import CategoryMenu from "@/components/layout/CategoryMenu";
import Notification from "@/components/layout/Notification";
import tokenCache from "@/utils/token-cache";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";

type AppHeaderProps = {
  onOpenSettings: () => void;
};

export default function AppHeader({ onOpenSettings }: AppHeaderProps) {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    tokenCache.isAuthenticated()
  );
  const [currentUser, setCurrentUser] = useState<any>(() =>
    tokenCache.getUser()
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuContainerRef = useRef<HTMLDivElement>(null);
  const trendingSearchRef = useRef<OverlayPanel>(null);
  const userAvatarUrl = currentUser?.customer?.__avatar__?.[0]?.fileUrl;
  const displayName =
    currentUser?.customer?.name || currentUser?.username || "Thành viên";

  const avatarLabel = !userAvatarUrl
    ? (displayName?.[0] || "U").toUpperCase()
    : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuContainerRef.current &&
        !userMenuContainerRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchFocus = (e: any) => {
    trendingSearchRef.current?.show(e, e.currentTarget);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      trendingSearchRef.current?.hide();
    }, 200);
  };

  const policyText =
    " Miễn phí vận chuyển cho đơn hàng từ 500.000đ |  Đổi trả trong 7 ngày |  Giảm giá 20% cho khách hàng mới |  Thanh toán an toàn 100%";

  const trendingSearchItems = [
    {
      name: "iPhone 17 Series",
      image: "https://via.placeholder.com/60x60/FF8C42/FFFFFF?text=📱",
    },
    {
      name: "Samsung Z Fold7",
      image: "https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=📱",
    },
    {
      name: "Apple Watch Series 11",
      image: "https://via.placeholder.com/60x60/E94B3C/FFFFFF?text=⌚",
    },
    {
      name: "iPhone Air",
      image: "https://via.placeholder.com/60x60/C5E1A5/FFFFFF?text=📱",
    },
    {
      name: "AirPods Pro 3",
      image: "https://via.placeholder.com/60x60/F5F5F5/000000?text=🎧",
    },
    {
      name: "iPad Pro M5",
      image: "https://via.placeholder.com/60x60/424242/FFFFFF?text=💻",
    },
    {
      name: "Samsung Galaxy Watch8",
      image: "https://via.placeholder.com/60x60/1E1E1E/FFFFFF?text=⌚",
    },
    {
      name: "MacBook Pro M5",
      image: "https://via.placeholder.com/60x60/2C2C2C/FFFFFF?text=💻",
    },
    {
      name: "OPPO Find X9",
      image: "https://via.placeholder.com/60x60/FF6B9D/FFFFFF?text=📱",
    },
    {
      name: "Camera IP 8MP EZVIZ H6C G1",
      image: "https://via.placeholder.com/60x60/FFFFFF/000000?text=📷",
    },
  ];

  const userMenuItemsLoggedIn: MenuItem[] = [
    {
      label: displayName,
      icon: "pi pi-fw pi-id-card",
      className: "font-bold text-primary",
      command: () => {},
    },
    { separator: true },
    {
      label: "Đơn hàng của tôi",
      icon: "pi pi-fw pi-shopping-bag",
    },
    {
      label: "Thông tin tài khoản",
      icon: "pi pi-fw pi-user-edit",
    },
    {
      label: "Đổi mật khẩu",
      icon: "pi pi-fw pi-key",
    },
    {
      separator: true,
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        tokenCache.clear();
        setIsLoggedIn(false);
        setCurrentUser(null);
        window.location.reload();
      },
    },
  ];

  const userMenuItemsGuest: MenuItem[] = [
    {
      label: "Đăng nhập",
      icon: "pi pi-fw pi-sign-in",
      command: () => setLoginVisible(true),
    },
    {
      label: "Đăng ký",
      icon: "pi pi-fw pi-user-plus",
      command: () => setRegisterVisible(true),
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Tìm kiếm:", searchQuery);
      trendingSearchRef.current?.hide();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTrendingClick = (itemName: string) => {
    setSearchQuery(itemName);
    trendingSearchRef.current?.hide();
    console.log("Tìm kiếm xu hướng:", itemName);
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md ">
        <div className="surface-700 ">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <i className="pi pi-phone"></i>
                <span>Hotline: 1900-xxxx</span>
              </div>

              <div className="flex-1 mx-4 overflow-hidden relative group">
                <div className="whitespace-nowrap inline-block animate-marquee hover:pause-animation">
                  <span className="mr-8">{policyText}</span>
                  <span className="mr-8">{policyText}</span>
                  <span className="mr-8">{policyText}</span>
                  <span className="mr-8">{policyText}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <img
                    src={FacebookIcon}
                    alt="Facebook"
                    className="w-5 h-5 object-contain"
                  />
                </a>
                <a
                  href="#"
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <img
                    src={YoutubeIcon}
                    alt="Youtube"
                    className="w-5 h-5 object-contain"
                  />
                </a>
                <a
                  href="#"
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <img
                    src={ZaloIcon}
                    alt="Zalo"
                    className="w-5 h-5 object-contain"
                  />
                </a>
                <a
                  href="#"
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <img
                    src={TiktokIcon}
                    alt="Tiktok"
                    className="w-5 h-5 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card border-bottom-1 surface-border ">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xl font-bold text-primary hidden sm:inline">
                    HimLamTourist
                  </span>
                </div>
                <CategoryMenu />
              </div>

              <div className="flex-1 max-w-md hidden lg:block">
                <IconField iconPosition="left" className="w-full text-xs">
                  <InputIcon className="pi pi-search" />
                  <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Tìm kiếm nhanh tour..."
                    className="w-full text-xs"
                  />
                </IconField>

                <OverlayPanel
                  ref={trendingSearchRef}
                  dismissable
                  className="w-full max-w-2xl"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <i className="pi pi-fire text-xl text-orange-500"></i>
                      <h3 className="text-lg font-bold">Xu hướng tìm kiếm</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {trendingSearchItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleTrendingClick(item.name)}
                          className="flex items-center gap-3 p-3 hover:surface-hover rounded-lg transition-colors text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="font-medium text-sm">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </OverlayPanel>
              </div>

              <div className="flex items-center gap-2">
                <Notification />
                <Button
                  icon="pi pi-cog"
                  rounded
                  text
                  onClick={onOpenSettings}
                  tooltip="Cài đặt"
                  tooltipOptions={{ position: "bottom" }}
                />

                <div className="relative" ref={userMenuContainerRef}>
                  {isLoggedIn ? (
                    <div
                      className="flex items-center gap-2 cursor-pointer p-1 hover:bg-[--surface-hover] rounded-full transition-colors pr-3"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      <Avatar
                        image={userAvatarUrl}
                        label={avatarLabel}
                        shape="circle"
                        className="bg-primary text-white"
                        style={{ width: "32px", height: "32px" }}
                      />
                      <span className="hidden sm:block font-medium text-sm max-w-30 truncate select-none">
                        {displayName}
                      </span>
                      <i className="pi pi-angle-down text-xs ml-1 text-[--text-color-secondary]"></i>
                    </div>
                  ) : (
                    <Button
                      icon="pi pi-user"
                      rounded
                      text
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    />
                  )}

                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 z-50 shadow-lg rounded-md overflow-hidden ">
                      <Menu
                        model={
                          isLoggedIn
                            ? userMenuItemsLoggedIn
                            : userMenuItemsGuest
                        }
                        className="w-full border-none"
                        pt={{
                          menuitem: { className: "text-sm" },
                          label: { className: "text-sm font-medium" },
                          icon: { className: "text-sm mr-2" },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        visible={loginVisible}
        onHide={() => setLoginVisible(false)}
        onSwitchToRegister={() => {
          setLoginVisible(false);
          setRegisterVisible(true);
        }}
        onSwitchToForgotPassword={() => {
          setLoginVisible(false);
          setForgotPasswordVisible(true);
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

      <ForgotPasswordModal
        visible={forgotPasswordVisible}
        onHide={() => setForgotPasswordVisible(false)}
        onSwitchToLogin={() => {
          setForgotPasswordVisible(false);
          setLoginVisible(true);
        }}
      />
    </>
  );
}
