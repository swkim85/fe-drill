import DatePicker from "./components/DatePicker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 font-sans">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">날짜 선택</h1>
          <p className="mt-1 text-sm text-gray-400">날짜를 직접 입력하거나 캘린더에서 선택하세요</p>
        </div>
        <DatePicker />
      </main>
    </div>
  );
}
