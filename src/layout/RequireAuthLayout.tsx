import BackToTop from "@/components/ui/back-to-top";
import { type ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

export default function RequireAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <AppHeader
        onOpenSettings={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div>
        <div>{children}</div>
      </div>

      <AppFooter />
      <BackToTop />
    </div>
  );
}
