import mongoose from "mongoose";

export type Image = {
    _id: mongoose.Types.ObjectId;
    fileId: string;
    url: string;
}

export type Post = {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    tags?: mongoose.Types.ObjectId[];
    feeling?: string;
    likes: mongoose.Types.ObjectId[];
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
}