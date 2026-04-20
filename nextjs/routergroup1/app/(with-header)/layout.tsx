import Header from "../../components/Header";

export default function WithHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
