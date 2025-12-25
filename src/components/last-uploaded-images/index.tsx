import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import getLastUploadedImages from "@/data/get-last-uploaded-images";
import { Image as ImageType } from "@/models/Image";
import Image from "next/image";

export default async function LastUploadedImages({ username }: { username: string }) {
    const images = await getLastUploadedImages(username)()

    if(images?.length === 0) return null
    
    return (
        <Card className="p-0 gap-0">
            <CardHeader className="gap-0 p-6">
                <CardTitle>Last Photos</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-1 w-full">
                    {images?.map(({ fileId, url }: ImageType) => (
                        <div key={fileId} className="w-full h-30 flex items-center justify-center">
                            <Image height={86} width={86} src={url} alt={fileId} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
