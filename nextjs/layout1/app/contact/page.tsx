export default function ContactPage() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-rose-700">CONTACT</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">문의</h2>
            <div className="mt-4 space-y-2 text-slate-600">
                <p>이메일: hello@demo-company.com</p>
                <p>전화: 02-1234-5678</p>
                <p>운영 시간: 평일 09:00 - 18:00</p>
            </div>
        </section>
    );
}