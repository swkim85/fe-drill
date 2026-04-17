import RichTextEditor from "./components/RichTextEditor";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 min-h-screen py-12 px-4">
      <main className="w-full max-w-3xl flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">리치 텍스트 에디터</h1>
        <RichTextEditor />
      </main>
    </div>
  );
}
