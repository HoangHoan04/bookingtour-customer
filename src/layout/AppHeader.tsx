import {
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/assets/icons";
import ForgotPasswordModal from "@/components/auth/ForgotPaswordForm";
import LoginModal from "@/components/auth/LoginForm";
import RegisterModal from "@/components/auth/RegisterFrom";
import tokenCache from "@/utils/token-cache";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type AppHeaderProps = {
  onOpenSettings: () => void;
  isScrolled?: boolean;
};

type MenuItemType = {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
};

export default function AppHeader({
  onOpenSettings,
  isScrolled = false,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    tokenCache.isAuthenticated(),
  );
  const [currentUser, setCurrentUser] = useState<any>(() =>
    tokenCache.getUser(),
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchSidebarVisible, setSearchSidebarVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const userAvatarUrl = currentUser?.customer?.__avatar__?.[0]?.fileUrl;
  const displayName = currentUser?.customer?.name || currentUser?.username;

  const avatarLabel = !userAvatarUrl
    ? (displayName?.[0] || "U").toUpperCase()
    : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          userMenuRef.current &&
          !userMenuRef.current.contains(event.target as Node)
        ) {
          setShowUserMenu(false);
        }
      }, 0);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchSidebarVisible && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [searchSidebarVisible]);

  const policyText =
    " Huỷ miễn phí trước 72 giờ |  Đổi lịch tour 1 lần |  Ưu đãi 10% cho đoàn từ 10 người |  Bảo hiểm du lịch miễn phí";

  const trendingSearchItems = [
    {
      name: "Tour Hạ Long 3N2Đ",
      image: "https://via.placeholder.com/60x60/FF8C42/FFFFFF?text=🏖️",
    },
    {
      name: "Du lịch Đà Nẵng",
      image: "https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=🏝️",
    },
    {
      name: "Tour Phú Quốc",
      image: "https://via.placeholder.com/60x60/E94B3C/FFFFFF?text=🌴",
    },
    {
      name: "Du lịch Sapa",
      image: "https://via.placeholder.com/60x60/C5E1A5/FFFFFF?text=⛰️",
    },
    {
      name: "Tour Nha Trang",
      image: "https://via.placeholder.com/60x60/F5F5F5/000000?text=🏖️",
    },
    {
      name: "Du lịch Hội An",
      image: "https://via.placeholder.com/60x60/424242/FFFFFF?text=🏮",
    },
    {
      name: "Tour Mũi Né",
      image: "https://via.placeholder.com/60x60/1E1E1E/FFFFFF?text=🏖️",
    },
    {
      name: "Du lịch Đà Lạt",
      image: "https://via.placeholder.com/60x60/2C2C2C/FFFFFF?text=🌸",
    },
  ];

  const menuItems: MenuItemType[] = [
    {
      label: "Dịch vụ",
      path: "/services",
      children: [
        { label: "Khám phá dịch vụ", path: "/services" },
        { label: "Hướng dẫn viên", path: "/guides" },
      ],
    },
    {
      label: "Điểm đến",
      path: "/destinations",
    },
    {
      label: "Tours",
      path: "/tours",
      children: [
        { label: "Trong nước", path: "/tours/domestic" },
        { label: "Nước ngoài", path: "/tours/international" },
      ],
    },
    {
      label: "Bài viết",
      path: "/blogs",
    },
    {
      label: "Liên hệ",
      path: "/contact",
      children: [
        { label: "Liên hệ ngay", path: "/contact" },
        { label: "FAQ", path: "/faq" },
      ],
    },
    {
      label: "Về chúng tôi",
      path: "/about",
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
      command: () => navigate("/my-orders"),
    },
    {
      label: "Thông tin tài khoản",
      icon: "pi pi-fw pi-user-edit",
      command: () => navigate("/profile"),
    },
    {
      label: "Đổi mật khẩu",
      icon: "pi pi-fw pi-key",
      command: () => navigate("/change-password"),
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
      setSearchSidebarVisible(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setSearchSidebarVisible(false);
    }
  };

  const handleTrendingClick = (itemName: string) => {
    setSearchQuery(itemName);
    console.log("Tìm kiếm xu hướng:", itemName);
    handleSearch();
  };

  const handleMenuClick = (path: string) => {
    setActiveMenu(path);
    navigate(path);
    setHoveredMenu(null);
  };

  const handleMenuMouseEnter = (itemPath: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredMenu(itemPath);
  };

  const handleMenuMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  };

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-300 ${
          isScrolled ? "top-0 shadow-lg" : "top-5"
        }`}
        style={{
          backdropFilter: isScrolled ? "none" : "blur(10px)",
          left: "7.5rem",
          right: "7.5rem",
          borderRadius: isScrolled ? "0 0 12px 12px" : "12px",
        }}
      >
        <div
          style={{
            borderRadius: isScrolled ? "0" : "12px 12px 0 0",
          }}
          className={`${
            isScrolled ? "bg-[#ffaa0d] text-[#0f766e]" : "bg-transparent "
          } border-bottom-1 surface-border transition-colors duration-300`}
        >
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

        <div
          className={`border-bottom-1 surface-border transition-colors duration-300 ${
            isScrolled ? "bg-[#ffaa0d] text-[#0f766e]" : "bg-transparent"
          }`}
          style={{
            borderRadius: isScrolled ? "0 0 12px 12px" : "0",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#0f766e",
                    fontFamily: "'Brush Script MT', cursive",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  HimLam Tourist
                </span>
              </div>

              <nav className="hidden lg:flex items-center gap-6">
                {menuItems.map((item, index) => {
                  const isActive = activeMenu === item.path;
                  const hasChildren = item.children && item.children.length > 0;
                  const isHovered = hoveredMenu === item.path;

                  return (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => handleMenuMouseEnter(item.path)}
                      onMouseLeave={handleMenuMouseLeave}
                    >
                      <button
                        onClick={() => handleMenuClick(item.path)}
                        className={`flex items-center gap-1 px-2 py-2 transition-all text-base font-semibold relative group ${
                          isActive
                            ? "text-primary"
                            : "text-[--text-color] hover:text-primary"
                        }`}
                      >
                        <span>{item.label}</span>
                        {hasChildren && (
                          <i
                            className={`pi pi-angle-down text-xs transition-transform ${
                              isHovered ? "rotate-180" : ""
                            }`}
                          ></i>
                        )}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                        {!isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        )}
                      </button>

                      {hasChildren && isHovered && (
                        <div
                          className="absolute top-full left-0 mt-1 surface-card shadow-lg rounded-md overflow-hidden min-w-50 border surface-border z-10"
                          style={{
                            backgroundColor: "var(--surface-card)",
                            opacity: 1,
                          }}
                        >
                          {item.children!.map((child, childIndex) => (
                            <button
                              key={childIndex}
                              onClick={() => handleMenuClick(child.path)}
                              className="w-full text-left px-4 py-3 surface-card hover:surface-hover transition-colors text-sm font-medium text-[--text-color] hover:text-primary border-bottom-1 surface-border last:border-none"
                              style={{ opacity: 1 }}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <Button
                  icon="pi pi-search"
                  rounded
                  text
                  onClick={() => setSearchSidebarVisible(true)}
                  tooltip="Tìm kiếm"
                  tooltipOptions={{ position: "bottom" }}
                />

                <Button
                  icon="pi pi-cog"
                  rounded
                  text
                  onClick={onOpenSettings}
                  tooltip="Cài đặt"
                  tooltipOptions={{ position: "bottom" }}
                />

                <div ref={userMenuRef} className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:surface-hover transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu((v) => !v);
                    }}
                  >
                    <Avatar
                      image={userAvatarUrl}
                      label={avatarLabel}
                      shape="circle"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                    />
                    <span className="hidden sm:block text-sm font-medium">
                      {displayName}
                    </span>
                    {isLoggedIn && <i className="pi pi-angle-down text-xs" />}
                  </div>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 z-50 surface-card shadow-lg rounded-md border surface-border min-w-48">
                      <Menu
                        model={
                          isLoggedIn
                            ? userMenuItemsLoggedIn
                            : userMenuItemsGuest
                        }
                        className="border-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        visible={searchSidebarVisible}
        onHide={() => setSearchSidebarVisible(false)}
        position="top"
        className="search-sidebar"
        blockScroll
        style={{
          height: "100vh",
          background: "rgba(0, 0, 0, 0.95)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full px-4">
          <div className="w-full max-w-3xl">
            <IconField iconPosition="left" className="w-full">
              <InputIcon className="pi pi-search text-2xl" />
              <InputText
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm tour du lịch..."
                className="w-full text-2xl py-4 pl-16 pr-6 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                style={{
                  borderRadius: "50px",
                }}
              />
            </IconField>

            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <i className="pi pi-fire text-2xl text-orange-500"></i>
                <h3 className="text-xl font-bold text-white">
                  Xu hướng tìm kiếm
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingSearchItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingClick(item.name)}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <span className="font-medium text-base text-white">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/50 text-sm">
                Nhấn <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd>{" "}
                để tìm kiếm hoặc{" "}
                <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> để đóng
              </p>
            </div>
          </div>
        </div>
      </Sidebar>

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
