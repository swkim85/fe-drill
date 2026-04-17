const menuItems = [
  { label: "메일", href: "/mail" },
  { label: "공유", href: "/share" },
  { label: "결제", href: "/approval" },
  { label: "양식", href: "/form" },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen bg-[linear-gradient(135deg,#f5efe6_0%,#efe7db_45%,#e3dccd_100%)] p-4 text-stone-900 sm:p-6 lg:p-8">
        <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/80 shadow-[0_30px_80px_rgba(84,63,36,0.16)] backdrop-blur sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
          <aside className="flex w-1/2 flex-col justify-between border-r border-stone-900/10 bg-[radial-gradient(circle_at_top_left,#fffaf2_0%,#f4ebdc_58%,#ebdfcd_100%)] p-6 sm:p-8 lg:p-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-stone-500">
                  Workspace
                </p>
                <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                  업무 메뉴를 선택하면 오른쪽 화면에서 바로 열립니다.
                </h1>
                <p className="max-w-md text-base leading-7 text-stone-600 sm:text-lg">
                  메일, 공유, 결제, 양식 메뉴를 클릭하면 같은 화면 안의 iframe에서 해당 페이지가 전환됩니다.
                </p>
              </div>

              <nav aria-label="업무 메뉴" className="grid gap-3">
                {menuItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="content-frame"
                    className="group flex items-center justify-between rounded-2xl border border-stone-900/10 bg-white/70 px-5 py-4 text-lg font-medium text-stone-800 shadow-[0_12px_30px_rgba(87,67,39,0.08)] transition hover:-translate-y-0.5 hover:border-stone-900/20 hover:bg-white"
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}. {item.label}
                    </span>
                    <span className="text-sm uppercase tracking-[0.3em] text-stone-400 transition group-hover:text-stone-700">
                      Open
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl border border-stone-900/10 bg-stone-950 px-5 py-4 text-stone-100 shadow-[0_18px_40px_rgba(28,18,6,0.22)]">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-400">
                Iframe Target
              </p>
              <p className="mt-2 text-lg font-medium">name=&quot;content-frame&quot;</p>
            </div>
          </aside>

          <section className="w-1/2 bg-stone-100 p-3 sm:p-4 lg:p-5">
            <div className="flex h-full min-h-[480px] flex-col overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-white shadow-inner">
              <div className="flex items-center gap-2 border-b border-stone-900/10 bg-stone-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ef8354]" />
                <span className="h-3 w-3 rounded-full bg-[#f6bd60]" />
                <span className="h-3 w-3 rounded-full bg-[#84a59d]" />
                <p className="ml-3 text-sm font-medium text-stone-500">Internal Preview</p>
              </div>
              <iframe
                title="업무 미리보기"
                name="content-frame"
                src="/mail"
                className="h-full w-full flex-1 bg-white"
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
