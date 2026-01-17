import ConfigSetting from "@/components/layout/ConfigSetting";
import { useEffect, useState } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="w-full min-h-screen relative"
      style={{ margin: 0, padding: 0, overflow: "hidden" }}
    >
      <AppHeader
        onOpenSettings={() => {
          setSettingsVisible(true);
        }}
        isScrolled={isScrolled}
      />

      <div style={{ margin: 0, padding: 0 }}>{children}</div>
      <AppFooter />

      <ConfigSetting
        visible={settingsVisible}
        onHide={() => {
          setSettingsVisible(false);
        }}
      />
    </div>
  );
}
