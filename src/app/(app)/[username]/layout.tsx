import ProfileHeader from "@/components/profile/ProfileHeader";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";

export default function ProfileLayout({ children }: CustomLayoutProps) {
  return (
    <section className="mt-16 lg:mx-20 lg:p-8 p-6">
      <ProfileHeader />
      {children}
    </section>
  );
}
