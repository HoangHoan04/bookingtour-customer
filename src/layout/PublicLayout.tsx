import ConfigSetting from "@/components/layout/ConfigSetting";
import BackToTop from "@/components/ui/back-to-top";
import { useEffect, useState } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import TravelChatbot from "@/components/ui/chatbot";

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

      <main className="pt-32" style={{ margin: 0, padding: 0 }}>
        <div style={{ paddingTop: "8rem" }}>{children}</div>
      </main>
      <AppFooter />

      <ConfigSetting
        visible={settingsVisible}
        onHide={() => {
          setSettingsVisible(false);
        }}
      />
      <BackToTop />
      <TravelChatbot />
    </div>
  );
}
