import mongoose from "mongoose"
import { Image } from "./Image";

export type Album = {
    _id: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AlbumWithImages = Album & {
    images: Image[]
}

const albumSchema = new mongoose.Schema<Album>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Album = mongoose.models.Album || mongoose.model<Album>("Album", albumSchema)
export default Album
