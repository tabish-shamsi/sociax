import { LeftSidebar } from "@/components/layout/left-sidebar";
import TopHeader from "@/components/layout/main-header";
import { StoriesSidebar } from "@/components/layout/right-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";
import { Suspense } from "react";

export default function AppLayout({ children }: CustomLayoutProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="">
        <Suspense fallback={null}>
          <TopHeader />
          <LeftSidebar />
        </Suspense>
        <StoriesSidebar />

        {children}
      </div>
    </TooltipProvider>
  );
}
