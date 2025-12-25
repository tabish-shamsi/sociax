import mongoose from "mongoose"

export type Image = {
    _id: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    fileId: string;
    albumId: mongoose.Types.ObjectId
    url: string;
    createdAt: Date
}

const imageShema = new mongoose.Schema<Image>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Image = mongoose.models.Image || mongoose.model<Image>('Image', imageShema)
export default Image