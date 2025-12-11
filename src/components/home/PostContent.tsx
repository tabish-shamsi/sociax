import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ContentProps {
  content: string;
  setContent: Function;
  setWordCount: Function;
}

export default function PostContent({
  content,
  setContent,
  setWordCount,
}: ContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Share your thoughts in here...",
        emptyEditorClass: "tiptap-empty",
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      setWordCount(editor.getText().length);
    },
  });

  return (
    <div className="flex-1 border rounded-xl px-4 py-3 min-h-[100px] bg-secondary focus-within:ring-2 focus-within:ring-blue-500">
      <EditorContent editor={editor} className="min-h-[70px]" />
    </div>
  );
}
