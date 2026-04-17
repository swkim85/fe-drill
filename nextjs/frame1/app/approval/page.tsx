export default function ApprovalPage() {
    return (
        <main className="min-h-screen bg-[#fbf8ff] px-6 py-8 text-stone-900">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b6fb3]">
                    Approval
                </p>
                <h1 className="text-4xl font-semibold tracking-tight">결제 화면</h1>
                <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-4">
                        <div>
                            <p className="text-lg font-medium">지출 결의서</p>
                            <p className="text-sm text-stone-500">승인 대기</p>
                        </div>
                        <span className="rounded-full bg-[#efe8ff] px-4 py-2 text-sm font-medium text-[#654a8c]">
                            Pending
                        </span>
                    </div>
                </section>
            </div>
        </main>
    );
}