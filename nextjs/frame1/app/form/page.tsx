export default function FormPage() {
    return (
        <main className="min-h-screen bg-[#f6fbff] px-6 py-8 text-stone-900">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3f7e9c]">
                    Form
                </p>
                <h1 className="text-4xl font-semibold tracking-tight">양식 화면</h1>
                <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-stone-50 p-4">휴가 신청서</div>
                        <div className="rounded-2xl bg-stone-50 p-4">출장 보고서</div>
                        <div className="rounded-2xl bg-stone-50 p-4">구매 요청서</div>
                        <div className="rounded-2xl bg-stone-50 p-4">회의록 양식</div>
                    </div>
                </section>
            </div>
        </main>
    );
}