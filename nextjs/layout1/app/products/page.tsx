const productList = [
    { id: 1, name: "Starter 플랜", price: "월 9,900원" },
    { id: 2, name: "Business 플랜", price: "월 29,000원" },
    { id: 3, name: "Enterprise 플랜", price: "별도 문의" },
];

export default function ProductsPage() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-indigo-700">PRODUCTS</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">제품</h2>
            <ul className="mt-6 space-y-3">
                {productList.map((product) => (
                    <li
                        key={product.id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
                    >
                        <span className="font-medium text-slate-800">{product.name}</span>
                        <span className="text-sm text-slate-500">{product.price}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}