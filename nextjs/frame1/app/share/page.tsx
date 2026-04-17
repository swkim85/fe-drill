export default function SharePage() {
    return (
        <main className="min-h-screen bg-[#f9faf5] px-6 py-8 text-stone-900">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6c8b5d]">
                    Share
                </p>
                <h1 className="text-4xl font-semibold tracking-tight">공유 화면</h1>
                <section className="grid gap-4 sm:grid-cols-2">
                    <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-medium">팀 문서함</h2>
                        <p className="mt-3 text-stone-600">업무 문서와 발표 자료를 한곳에 정리합니다.</p>
                    </article>
                    <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-medium">최근 공유</h2>
                        <p className="mt-3 text-stone-600">디자인 시안, 계약서, 회의록이 공유되었습니다.</p>
                    </article>
                </section>
            </div>
        </main>
    );
}