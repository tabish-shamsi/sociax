import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomAvatarFallback from "./CustomAvatarFallback";

interface User {
  title: string;
  subtitle: string;
  avatarSrc: string;
  size: string;
  titleColor?: string;
}

export default function User({ title, subtitle, avatarSrc, size }: User) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={`w-${size} h-${size}`}>
        <AvatarImage src={avatarSrc} alt={title} />
        <CustomAvatarFallback name={title} />
      </Avatar>

      <div className="flex flex-col">
        <span className="font-semibold text-secondary-foreground">{title}</span>
        <span className="text-gray-400 text-xs">{subtitle}</span>
      </div>
    </div>
  );
}
