import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
};

export default function Notification() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Thông báo hệ thống",
      message: "Hệ thống sẽ bảo trì vào 2h sáng ngày mai.",
      time: "5 phút trước",
      read: false,
      type: "warning",
    },
    {
      id: "2",
      title: "Cập nhật thành công",
      message: "Dữ liệu của bạn đã được cập nhật.",
      time: "1 giờ trước",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Tin nhắn mới",
      message: "Bạn có 3 tin nhắn chưa đọc từ quản trị viên.",
      time: "2 giờ trước",
      read: true,
      type: "info",
    },
    {
      id: "4",
      title: "Cảnh báo bảo mật",
      message: "Phát hiện đăng nhập từ thiết bị lạ.",
      time: "3 giờ trước",
      read: true,
      type: "error",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleRefresh = () => setNotifications([...notifications]);

  const handleViewAll = () => {
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIconByType = (type: NotificationItem["type"]) => {
    switch (type) {
      case "info":
        return "pi pi-info-circle text-blue-500";
      case "warning":
        return "pi pi-exclamation-triangle text-orange-500";
      case "success":
        return "pi pi-check-circle text-green-500";
      case "error":
        return "pi pi-times-circle text-red-500";
      default:
        return "pi pi-bell";
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div className="relative">
        <Button
          icon="pi pi-bell"
          rounded
          text
          onClick={() => setIsOpen(!isOpen)}
          tooltip="Thông báo"
          tooltipOptions={{ position: "bottom" }}
          className="transition-transform active:scale-95"
        />
        {unreadCount > 0 && (
          <Badge
            value={unreadCount > 9 ? "9+" : unreadCount}
            severity="danger"
            className="absolute -top-1 -right-1 pointer-events-none shadow-sm"
          />
        )}
      </div>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-3 w-80 sm:w-96 
                     bg-(--surface-overlay) 
                     text-(--text-color)
                     border border-(--surface-border) 
                     shadow-2xl rounded-xl z-50 overflow-hidden 
                     origin-top-right animate-[fadeIn_0.2s_ease-out]"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-(--surface-border)">
              <h3 className="text-lg font-semibold m-0">Thông báo</h3>
              <div className="flex gap-1">
                <Button
                  icon="pi pi-check-square"
                  rounded
                  text
                  size="small"
                  onClick={handleMarkAllAsRead}
                  tooltip="Đánh dấu tất cả là đã đọc"
                  className="w-8! h-8!"
                />
                <Button
                  icon="pi pi-refresh"
                  rounded
                  text
                  size="small"
                  onClick={handleRefresh}
                  tooltip="Làm mới"
                  className="w-8! h-8!"
                />
              </div>
            </div>

            <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-(--text-color-secondary)">
                  <i className="pi pi-bell-slash text-4xl mb-3 opacity-50" />
                  <p className="m-0 text-sm">Không có thông báo mới</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`group flex gap-4 p-4 border-b border-(--surface-border) last:border-0 cursor-pointer transition-all duration-200 hover:bg-(--surface-hover) 
                    ${
                      !notification.read
                        ? "bg-(--primary-50) dark:bg-white/5"
                        : ""
                    }`}
                  >
                    <div className="shrink-0 mt-1">
                      <i
                        className={`${getIconByType(
                          notification.type
                        )} text-xl transition-transform group-hover:scale-110`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`text-sm m-0 truncate leading-tight ${
                            !notification.read
                              ? "font-bold"
                              : "font-medium opacity-90"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shadow-sm animate-pulse" />
                        )}
                      </div>

                      <p className="text-sm m-0 mb-2 line-clamp-2 text-(--text-color-secondary) leading-relaxed">
                        {notification.message}
                      </p>

                      <span className="text-xs text-(--text-color-secondary) opacity-70 flex items-center gap-1">
                        <i className="pi pi-clock text-[10px]"></i>
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-2 border-t border-(--surface-border) bg-(--surface-ground) text-center">
                <Button
                  label="Xem tất cả thông báo"
                  link
                  size="small"
                  className="w-full text-sm font-semibold no-underline!"
                  onClick={handleViewAll}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
