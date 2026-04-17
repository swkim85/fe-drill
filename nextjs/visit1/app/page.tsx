import ReservationForm from "./components/ReservationForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <ReservationForm />
    </div>
  );
}
