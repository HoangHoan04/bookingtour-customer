import ConfigSetting from "@/components/layout/ConfigSetting";
import { useState } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <div className="mx-30">
      <AppHeader
        onOpenSettings={() => {
          setSettingsVisible(true);
        }}
      />

      <div>{children}</div>
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
