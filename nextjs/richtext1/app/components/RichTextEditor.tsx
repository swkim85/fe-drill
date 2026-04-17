"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${active
            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
    >
        {children}
    </button>
);

const Divider = () => (
    <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" />
);

export default function RichTextEditor() {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
            Image.configure({ inline: false, allowBase64: true }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
            },
            handlePaste(view, event) {
                const items = event.clipboardData?.items;
                if (!items) return false;
                for (const item of Array.from(items)) {
                    if (item.type.startsWith("image/")) {
                        event.preventDefault();
                        const file = item.getAsFile();
                        if (!file) continue;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const src = e.target?.result as string;
                            if (src) {
                                view.dispatch(
                                    view.state.tr.replaceSelectionWith(
                                        view.state.schema.nodes.image.create({ src })
                                    )
                                );
                            }
                        };
                        reader.readAsDataURL(file);
                        return true;
                    }
                }
                return false;
            },
        },
    });

    if (!editor) return null;

    const setLink = () => {
        const url = window.prompt("URL을 입력하세요:", editor.getAttributes("link").href);
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-900">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                {/* History */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="실행 취소">
                    ↩
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="다시 실행">
                    ↪
                </ToolbarButton>

                <Divider />

                {/* Headings */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                    title="제목 1"
                >
                    H1
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                    title="제목 2"
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive("heading", { level: 3 })}
                    title="제목 3"
                >
                    H3
                </ToolbarButton>

                <Divider />

                {/* Text formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="굵게"
                >
                    <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="기울임"
                >
                    <em>I</em>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                    title="밑줄"
                >
                    <span className="underline">U</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive("strike")}
                    title="취소선"
                >
                    <span className="line-through">S</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive("code")}
                    title="인라인 코드"
                >
                    {"<>"}
                </ToolbarButton>

                <Divider />

                {/* Color */}
                <label title="글자 색상" className="relative cursor-pointer px-2 py-1 rounded text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700">
                    A
                    <input
                        type="color"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        onInput={(e) =>
                            editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()
                        }
                    />
                </label>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
                    active={editor.isActive("highlight")}
                    title="형광펜"
                >
                    🖊
                </ToolbarButton>

                <Divider />

                {/* Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    active={editor.isActive({ textAlign: "left" })}
                    title="왼쪽 정렬"
                >
                    ≡
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    active={editor.isActive({ textAlign: "center" })}
                    title="가운데 정렬"
                >
                    ☰
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    active={editor.isActive({ textAlign: "right" })}
                    title="오른쪽 정렬"
                >
                    ≣
                </ToolbarButton>

                <Divider />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                    title="불릿 목록"
                >
                    •≡
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                    title="번호 목록"
                >
                    1≡
                </ToolbarButton>

                <Divider />

                {/* Block */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive("blockquote")}
                    title="인용구"
                >
                    ❝
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive("codeBlock")}
                    title="코드 블록"
                >
                    {"{ }"}
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="구분선"
                >
                    —
                </ToolbarButton>

                <Divider />

                {/* Link */}
                <ToolbarButton
                    onClick={setLink}
                    active={editor.isActive("link")}
                    title="링크"
                >
                    🔗
                </ToolbarButton>

                <Divider />

                {/* Image */}
                <label title="이미지 삽입" className="relative cursor-pointer px-2 py-1 rounded text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700">
                    🖼
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                                const src = ev.target?.result as string;
                                if (src) editor.chain().focus().setImage({ src }).run();
                            };
                            reader.readAsDataURL(file);
                            e.target.value = "";
                        }}
                    />
                </label>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            {/* Footer */}
            <div className="px-4 py-1.5 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-400 dark:text-zinc-500 text-right">
                {editor.storage.characterCount?.characters?.() ?? editor.getText().length} 자
            </div>
        </div>
    );
}
