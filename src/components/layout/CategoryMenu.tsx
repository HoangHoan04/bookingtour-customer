import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useRef, useState } from "react";

const mockCategoriesData: any[] = [
  {
    id: "phones-tablets",
    label: "Điện thoại, Tablet",
    icon: "pi pi-fw pi-mobile",
    hasSubmenu: true,
  },
  {
    id: "laptop",
    label: "Laptop",
    icon: "pi pi-fw pi-desktop",
    hasSubmenu: true,
  },
  {
    id: "audio",
    label: "Âm thanh, Mic thu âm",
    icon: "pi pi-fw pi-volume-up",
    hasSubmenu: false,
  },
  {
    id: "watch-camera",
    label: "Đồng hồ, Camera",
    icon: "pi pi-fw pi-clock",
    hasSubmenu: false,
  },
  {
    id: "home-beauty",
    label: "Đồ gia dụng, Làm đẹp",
    icon: "pi pi-fw pi-home",
    hasSubmenu: false,
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    icon: "pi pi-fw pi-box",
    hasSubmenu: false,
  },
  {
    id: "pc-monitor",
    label: "PC, Màn hình, Máy in",
    icon: "pi pi-fw pi-desktop",
    hasSubmenu: false,
  },
  {
    id: "tv-appliances",
    label: "Tivi, Điện máy",
    icon: "pi pi-fw pi-video",
    hasSubmenu: false,
  },
  {
    id: "trade-in",
    label: "Thu cũ đổi mới",
    icon: "pi pi-fw pi-refresh",
    hasSubmenu: false,
  },
  {
    id: "used",
    label: "Hàng cũ",
    icon: "pi pi-fw pi-tag",
    hasSubmenu: false,
  },
  {
    id: "promotions",
    label: "Khuyến mãi",
    icon: "pi pi-fw pi-percentage",
    hasSubmenu: false,
  },
  {
    id: "tech-news",
    label: "Tin công nghệ",
    icon: "pi pi-fw pi-info-circle",
    hasSubmenu: false,
  },
];

const mockCategoryDetailsData: Record<string, any> = {
  "phones-tablets": {
    brands: [
      { name: "Apple", logo: "🍎" },
      { name: "Samsung", logo: "S" },
      { name: "Xiaomi", logo: "MI" },
      { name: "OPPO", logo: "OP" },
      { name: "Vivo", logo: "V" },
      { name: "Realme", logo: "R" },
      { name: "ASUS", logo: "A" },
      { name: "Nokia", logo: "N" },
    ],
    priceRanges: [
      { label: "Dưới 2 triệu" },
      { label: "2 - 4 triệu" },
      { label: "4 - 7 triệu" },
      { label: "7 - 13 triệu" },
      { label: "13 - 20 triệu" },
      { label: "Trên 20 triệu" },
    ],
    hotProducts: [
      { name: "iPhone 15 Pro Max 256GB", badge: "Hot" },
      { name: "Samsung Galaxy S24 Ultra", badge: "New" },
      { name: "Xiaomi 14 Ultra", badge: "Sale" },
      { name: "OPPO Find N3 Flip", badge: null },
    ],
  },
  laptop: {
    computers: [
      { name: "MacBook", logo: "🍎" },
      { name: "Asus", logo: "A" },
      { name: "Dell", logo: "D" },
      { name: "HP", logo: "H" },
      { name: "Lenovo", logo: "L" },
      { name: "MSI", logo: "M" },
    ],
  },
};

const fetchCategories = async (): Promise<any[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCategoriesData), 300)
  );
};

const fetchCategoryDetails = async (
  categoryId: string
): Promise<any | null> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCategoryDetailsData[categoryId] || null), 200)
  );
};

export default function CategoryMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [categoryDetails, setCategoryDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hideScrollbarClass =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
        setSelectedCategoryId(null);
        setCategoryDetails(null);
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const handleCategoryHover = async (category: any) => {
    if (!category.hasSubmenu) {
      setSelectedCategoryId(null);
      setCategoryDetails(null);
      return;
    }
    if (selectedCategoryId === category.id) return;

    setSelectedCategoryId(category.id);
    setLoading(true);

    const details = await fetchCategoryDetails(category.id);
    setCategoryDetails(details);
    setLoading(false);
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-3 gap-6 animate-pulse">
      <div>
        <Skeleton width="150px" height="24px" className="mb-4" />
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} width="100%" height="80px" borderRadius="8px" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton width="150px" height="24px" className="mb-4" />
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height="40px" borderRadius="8px" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <Button
        label="Danh mục"
        icon="pi pi-bars"
        onClick={() => setMenuVisible(!menuVisible)}
        text
        className="hidden md:inline-flex"
      />

      {menuVisible && (
        <div
          className="absolute top-full left-0 mt-2 z-50 flex rounded-xl overflow-hidden shadow-2xl 
                     bg-(--surface-overlay) 
                     text-(--text-color)
                     border border-(--surface-border)"
          style={{
            width: selectedCategoryId ? "1000px" : "320px",
            maxHeight: "600px",
            transition: "width 0.2s ease-out",
          }}
        >
          <div
            className={`overflow-y-auto border-r border-(--surface-border) bg-(--surface-overlay) ${hideScrollbarClass}`}
            style={{
              width: "320px",
              height: "600px",
              flexShrink: 0,
            }}
          >
            <div className="p-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1
                    ${
                      selectedCategoryId === category.id
                        ? "bg-(--primary-color) text-(--primary-color-text) shadow-md"
                        : "hover:bg-(--surface-hover) text-(--text-color)"
                    }`}
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${category.icon} text-lg`}></i>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  {category.hasSubmenu && (
                    <i
                      className={`pi pi-angle-right text-sm ${
                        selectedCategoryId === category.id
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    ></i>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedCategoryId && (
            <div
              className={`flex-1 p-6 overflow-y-auto bg-(--surface-ground) ${hideScrollbarClass}`}
              style={{ height: "600px", width: "calc(100vw - 320px)" }}
            >
              {loading ? (
                renderLoadingSkeleton()
              ) : categoryDetails ? (
                <div className="grid grid-cols-1 gap-8 animate-[fadeIn_0.3s_ease-out]">
                  {categoryDetails.brands && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-(--text-color)">
                        <i className="pi pi-th-large text-blue-500"></i>
                        Thương hiệu nổi bật
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {categoryDetails.brands.map(
                          (brand: any, index: any) => (
                            <div
                              key={index}
                              className="group flex flex-col items-center justify-center gap-2 h-24 p-3 
                                       bg-(--surface-overlay) border border-(--surface-border) rounded-xl 
                                       cursor-pointer transition-all hover:shadow-lg hover:border-(--primary-color)"
                            >
                              <div className="text-2xl font-bold group-hover:scale-110 transition-transform">
                                {brand.logo}
                              </div>
                              <span className="text-sm font-semibold text-(--text-color-secondary) group-hover:text-(--text-color)">
                                {brand.name}
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      {categoryDetails.priceRanges && (
                        <>
                          <Divider className="my-6" />
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <i className="pi pi-wallet text-green-500"></i>
                            Mức giá
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {categoryDetails.priceRanges.map(
                              (range: any, index: any) => (
                                <Button
                                  key={index}
                                  label={range.label}
                                  outlined
                                  className="border-(--surface-border)! text-(--text-color)! hover:bg-(--surface-hover)! hover:border-(--primary-color)!"
                                  size="small"
                                />
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {categoryDetails.hotProducts && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <i className="pi pi-fire text-orange-500"></i>
                        Sản phẩm bán chạy
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categoryDetails.hotProducts.map(
                          (product: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 
                                         bg-(--surface-overlay) border border-(--surface-border) rounded-lg 
                                         hover:shadow-md hover:border-orange-400 cursor-pointer transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xl">
                                  📱
                                </div>
                                <span className="font-medium text-sm">
                                  {product.name}
                                </span>
                              </div>
                              {product.badge && (
                                <Badge
                                  value={product.badge}
                                  severity={
                                    product.badge === "Hot"
                                      ? "danger"
                                      : "success"
                                  }
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {categoryDetails.computers && (
                    <div>
                      <h3 className="text-lg font-bold mb-4">Hãng sản xuất</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {categoryDetails.computers.map(
                          (item: any, index: any) => (
                            <Button
                              key={index}
                              label={item.name}
                              severity="secondary"
                              outlined
                              className="w-full"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-(--text-color-secondary) opacity-60">
                  <i className="pi pi-folder-open text-4xl mb-3"></i>
                  <span>Đang cập nhật nội dung...</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
