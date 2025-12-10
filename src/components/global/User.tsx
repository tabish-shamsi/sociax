import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  title: string;
  subtitle: string;
  avatarSrc: string;
  size: string;
  titleColor?: string;
}

export default function User({
  title,
  subtitle,
  avatarSrc,
  size,
  titleColor,
}: User) {
  const initials = title
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center gap-2">
      <Avatar className={`w-${size} h-${size}`}>
        <AvatarImage src={avatarSrc} alt={title} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="hidden md:flex flex-col">
        <span
          className={cn("font-semibold", titleColor ? titleColor : "text-secondary-foreground")}
        >
          {title}
        </span>
        <span className="text-gray-400 text-xs">{subtitle}</span>
      </div>
    </div>
  );
}
