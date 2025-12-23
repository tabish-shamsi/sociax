import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileHeaderSkeleton from "@/components/skeletons/profile-header-skeleton";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";
import { Suspense } from "react";

export default function ProfileLayout({ children }: CustomLayoutProps) {
  return (
    <section className="mt-16 lg:mx-20 lg:p-8 p-6">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        {/* <ProfileHeader /> */}
      </Suspense>
      {children}
    </section>
  );
}
