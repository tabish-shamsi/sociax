import { Card, CardContent, CardTitle } from "../ui/card";

export default function AlbumHeader({ firstName }: { firstName: string; }) {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
                <CardTitle className="text-lg">{`${firstName}'s Photo Albums`}</CardTitle>
            </CardContent>
        </Card>
    )
}