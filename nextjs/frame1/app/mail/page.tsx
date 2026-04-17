export default function MailPage() {
    return (
        <main className="min-h-screen bg-[#fffdf8] px-6 py-8 text-stone-900">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b07d45]">
                    Mail
                </p>
                <h1 className="text-4xl font-semibold tracking-tight">메일 화면</h1>
                <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-medium">받은 편지함</h2>
                    <div className="mt-4 space-y-3 text-stone-600">
                        <div className="rounded-2xl bg-stone-50 p-4">프로젝트 진행 현황 공유</div>
                        <div className="rounded-2xl bg-stone-50 p-4">결재 요청 문서 도착</div>
                        <div className="rounded-2xl bg-stone-50 p-4">이번 주 회의 일정 안내</div>
                    </div>
                </section>
            </div>
        </main>
    );
}