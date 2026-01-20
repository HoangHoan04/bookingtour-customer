import BackToTop from "@/components/ui/back-to-top";
import { type ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <BackToTop />
    </div>
  );
}
