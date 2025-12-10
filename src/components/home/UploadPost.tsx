"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Image as ImageIcon,
  Smile,
  UserPlus,
  X,
  ChevronDown,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function CreatePost({ user }) {
  const [images, setImages] = useState([]);
  const [feeling, setFeeling] = useState("");
  const [taggedFriends, setTaggedFriends] = useState([]);

  const FEELINGS = [
    "😀 Happy",
    "😢 Sad",
    "😡 Angry",
    "😲 Shocked",
    "😴 Tired",
    "😍 Loved",
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's on your mind?",
        emptyEditorClass: "tiptap-empty",
      }),
    ],
    content: "",
    immediatelyRender: false
  });

  /** Handle Image Upload (Max 4 images) **/
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const selectedCount = images.length + files.length;
    if (selectedCount > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    setImages((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  /** Remove Image **/
  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
    URL.revokeObjectURL(url);
  };

  /** Add Emoji **/
  const addEmoji = (emoji) => {
    editor.chain().focus().insertContent(emoji.native).run();
  };

  /** Fake Friends List **/
  const FRIEND_SUGGESTIONS = [
    "Ali Khan",
    "Sarah Ahmed",
    "John Doe",
    "Ayesha Malik",
    "Usman Tariq",
  ];

  /** Toggle Tag Friend **/
  const toggleTagFriend = (friend) => {
    setTaggedFriends((prev) =>
      prev.includes(friend)
        ? prev.filter((name) => name !== friend)
        : [...prev, friend]
    );
  };

  /** Can Post? **/
  const canPost =
    editor?.getText().trim().length > 0 ||
    images.length > 0 ||
    feeling ||
    taggedFriends.length > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Create post</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Top Section */}
        <div className="flex items-start gap-4 p-4 border-y">
          <Avatar className="w-11 h-11">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1 border rounded-xl px-4 py-3 min-h-[100px] bg-gray-50 dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500">
            <EditorContent editor={editor} className="min-h-[70px]" />

            {/* Feelings + Tags Display */}
            <div className="mt-2 flex gap-2 flex-wrap text-sm text-blue-600">
              {feeling && <span>is feeling {feeling}</span>}
              {taggedFriends.length > 0 && (
                <span>
                  with {taggedFriends.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {images.length > 0 && (
          <div className="px-4 mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((img) => (
              <div key={img.url} className="relative rounded-lg overflow-hidden border group">
                <img src={img.url} className="w-full h-32 object-cover" alt="" />

                <button
                  onClick={() => removeImage(img.url)}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center px-4 py-3 mt-2 border rounded-lg bg-gray-50">

          {/* Add Image */}
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md">
            <ImageIcon className="w-5 h-5 text-green-500" />
            Photo
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>

          {/* Tag Friends */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md">
              <UserPlus className="w-5 h-5 text-blue-500" />
              Tag Friends
            </PopoverTrigger>

            <PopoverContent className="w-56">
              <h4 className="font-medium mb-2">Tag friends</h4>
              <div className="space-y-2">
                {FRIEND_SUGGESTIONS.map((friend) => (
                  <div
                    key={friend}
                    onClick={() => toggleTagFriend(friend)}
                    className="cursor-pointer flex items-center justify-between hover:bg-gray-100 p-1 rounded"
                  >
                    <span>{friend}</span>
                    <input type="checkbox" checked={taggedFriends.includes(friend)} readOnly />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Feelings */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md">
              <Smile className="w-5 h-5 text-yellow-500" />
              Feeling
              <ChevronDown size={16} />
            </PopoverTrigger>

            <PopoverContent className="w-48">
              <div className="space-y-1">
                {FEELINGS.map((f) => (
                  <div
                    key={f}
                    onClick={() => setFeeling(f)}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Emoji Picker */}
          <Popover>
            <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-md">
              <Smile className="w-5 h-5 text-pink-500" />
            </PopoverTrigger>
            <PopoverContent>
              <Picker data={data} previewPosition="none" onEmojiSelect={addEmoji} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Post Button */}
        <div className="px-4 mt-4">
          <Button
            className="w-full"
            disabled={!canPost}
          >
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
