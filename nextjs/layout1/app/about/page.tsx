export default function AboutPage() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-emerald-700">ABOUT</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">소개</h2>
            <p className="mt-4 max-w-2xl text-slate-600">
                저희는 사용자 중심의 웹 서비스를 만드는 팀입니다. 공통 레이아웃과
                파일 기반 라우팅을 이용해 화면 구조를 깔끔하게 분리할 수 있습니다.
            </p>
        </section>
    );
}