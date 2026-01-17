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
import { OverlayPanel } from "primereact/overlaypanel";
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
    tokenCache.isAuthenticated()
  );
  const [currentUser, setCurrentUser] = useState<any>(() =>
    tokenCache.getUser()
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchPanelVisible, setSearchPanelVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const userMenuContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const trendingSearchRef = useRef<OverlayPanel>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const userAvatarUrl = currentUser?.customer?.__avatar__?.[0]?.fileUrl;
  const displayName =
    currentUser?.customer?.name || currentUser?.username || "Thành viên";

  const avatarLabel = !userAvatarUrl
    ? (displayName?.[0] || "U").toUpperCase()
    : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("🔍 handleClickOutside triggered");
      // Delay để onClick của button được xử lý trước
      setTimeout(() => {
        if (
          userMenuContainerRef.current &&
          !userMenuContainerRef.current.contains(event.target as Node)
        ) {
          console.log("❌ Closing user menu (click outside)");
          setShowUserMenu(false);
        }
        if (
          searchPanelRef.current &&
          !searchPanelRef.current.contains(event.target as Node) &&
          searchButtonRef.current &&
          !searchButtonRef.current.contains(event.target as Node)
        ) {
          setSearchPanelVisible(false);
        }
      }, 0);
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

  const menuItems: MenuItemType[] = [
    {
      label: "Tour trong nước",
      path: "/tours/domestic",
      children: [
        { label: "Miền Bắc", path: "/tours/domestic/north" },
        { label: "Miền Trung", path: "/tours/domestic/central" },
        { label: "Miền Nam", path: "/tours/domestic/south" },
        { label: "Cao nguyên", path: "/tours/domestic/highland" },
      ],
    },
    {
      label: "Tour nước ngoài",
      path: "/tours/international",
      children: [
        { label: "Châu Á", path: "/tours/international/asia" },
        { label: "Châu Âu", path: "/tours/international/europe" },
        { label: "Châu Mỹ", path: "/tours/international/america" },
        { label: "Châu Úc", path: "/tours/international/oceania" },
      ],
    },

    {
      label: "Khuyến mãi",
      path: "/promotions",
    },
    {
      label: "Liên hệ",
      path: "/contact",
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
      setSearchPanelVisible(false);
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
    setSearchPanelVisible(false);
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
          isScrolled ? "top-0 shadow-lg" : "top-5 "
        }`}
        style={{
          backdropFilter: isScrolled ? "none" : "blur(10px)",
          left: "7.5rem",
          right: "7.5rem",
          borderRadius: isScrolled ? "0 0 12px 12px" : "12px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            borderRadius: isScrolled ? "0" : "12px 12px 0 0",
          }}
          className={`${
            isScrolled ? "bg-blue-200" : "bg-transparent"
          } surface-card border-bottom-1 surface-border transition-colors duration-300`}
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

        {/* Main header */}
        <div
          className={` surface-card border-bottom-1 surface-border transition-colors duration-300 ${
            isScrolled ? "bg-blue-200" : "bg-transparent"
          }`}
          style={{
            borderRadius: isScrolled ? "0 0 12px 12px" : "0",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 gap-4">
              {/* Logo */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "'Brush Script MT', cursive",
                    textShadow: `
                      3px 3px 0 rgba(0,0,0,0.3),
                      6px 6px 0 rgba(0,0,0,0.2),
                      0 0 40px rgba(255,255,255,0.3)
                `,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  HimLam Tourist
                </span>
              </div>

              {/* Navigation Menu */}
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

                      {/* Dropdown Menu */}
                      {hasChildren && isHovered && (
                        <div className="absolute top-full left-0 mt-1  rounded-md overflow-hidden min-w-50 border surface-border">
                          {item.children!.map((child, childIndex) => (
                            <button
                              key={childIndex}
                              onClick={() => handleMenuClick(child.path)}
                              className="w-full text-left px-4 py-3  transition-colors text-sm font-medium text-[--text-color] hover:text-primary border-bottom-1 surface-border last:border-none"
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

              {/* Right side icons */}
              <div className="flex items-center gap-2">
                {/* Search Icon */}
                <Button
                  icon="pi pi-search"
                  rounded
                  text
                  onClick={() => setSearchPanelVisible(!searchPanelVisible)}
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

                {/* USER MENU */}
                <div ref={userMenuRef} className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu((v) => !v);
                    }}
                  >
                    <Avatar
                      image={userAvatarUrl}
                      label={avatarLabel}
                      shape="circle"
                      style={{ width: 32, height: 32 }}
                    />
                    <span className="hidden sm:block text-sm font-medium">
                      {displayName}
                    </span>
                    <i className="pi pi-angle-down text-xs" />
                  </div>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 z-50 surface-card shadow-lg rounded-md border min-w-48">
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

        {/* Search Panel */}
        {searchPanelVisible && (
          <div
            ref={searchPanelRef}
            className="surface-card border-bottom-1 surface-border shadow-lg relative"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="max-w-3xl mx-auto relative">
                <IconField iconPosition="left" className="w-full">
                  <InputIcon className="pi pi-search" />
                  <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Tìm kiếm nhanh tour du lịch..."
                    className="w-full text-base pr-10"
                    autoFocus
                  />
                </IconField>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-[--surface-hover] rounded-full transition-colors"
                    aria-label="Xóa text"
                  >
                    <i className="pi pi-times text-sm text-[--text-color-secondary] hover:text-primary"></i>
                  </button>
                )}

                <OverlayPanel
                  ref={trendingSearchRef}
                  dismissable
                  className="w-full max-w-3xl"
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
            </div>
          </div>
        )}
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
