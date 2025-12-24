import ProfileHeader from "@/components/profile-header/profile-header";
import ProfileHeaderSkeleton from "@/components/skeletons/profile-header-skeleton";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";
import { Suspense } from "react";

export default async function ProfileLayout({
  params,
  children
}: {
  params: Promise<{ username: string }>;
  children: React.ReactNode
}) {
  "use cache"
  const { username } = await params

  return (
    <section className="mt-16 lg:mx-20 lg:p-8 p-6">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader username={username} />
      </Suspense>
      {children}
    </section>
  );
}
