import { LeftSidebar } from "@/components/layout/left-sidebar";
import TopHeader from "@/components/layout/main-header";
import { StoriesSidebar } from "@/components/layout/right-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";

export default function AppLayout({ children }: CustomLayoutProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="">
        <TopHeader />
        <LeftSidebar />
        <StoriesSidebar />

        <div className="mt-16 lg:mx-20 lg:p-8 p-6">
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
