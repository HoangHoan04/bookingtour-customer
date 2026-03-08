import ConfigSetting from "@/components/layout/ConfigSetting";
import BackToTop from "@/components/ui/back-to-top";
import { useEffect, useRef, useState } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) return;

      timeoutRef.current = window.setTimeout(() => {
        if (window.scrollY > 20) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        timeoutRef.current = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
    </div>
  );
}
