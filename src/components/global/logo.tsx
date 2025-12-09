import { Activity} from "lucide-react";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 text-white bg-primary px-6 h-full"
    >
      <Activity size={26} />

      <span className="font-semibold md:text-lg">Sociax</span>
    </Link>
  );
}
