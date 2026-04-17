export default function Home() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold tracking-wide text-sky-700">HOME</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">홈 화면입니다.</h2>
      <p className="mt-4 max-w-2xl text-slate-600">
        상단 메뉴를 클릭하면 공통 layout은 유지되고, 아래 content 영역만 페이지별
        내용으로 변경됩니다.
      </p>
    </section>
  );
}
