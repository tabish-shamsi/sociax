import { MapPin } from "lucide-react";

export default function BasicInfo({ name, location, username }: { name: string; location: string; username: string; }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="xl:text-2xl lg:text-xl  text-lg  font-bold text-card-foreground">
                {name}
            </h3>
            <p className="text-gray-500 xl:text-base lg:text-sm text-xs dark:text-gray-400 flex items-center justify-center gap-1">
                {
                    location ? (
                        <>
                            <MapPin className="w-4 h-4" />
                            {location}
                        </>
                    ) : (
                        `@${username}`
                    )
                }
            </p>
        </div>
    )
}