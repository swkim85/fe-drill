"use client";

import { useState } from "react";
import VisitorSearch, { type Visitor } from "./VisitorSearch";

interface FormData {
    location: string;
    visitDate: string;
    visitor: Visitor | null;
}

export default function ReservationForm() {
    const [form, setForm] = useState<FormData>({ location: "", visitDate: "", visitor: null });
    const [showSearch, setShowSearch] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.location || !form.visitDate || !form.visitor) return;
        setSubmitted(true);
    };

    const handleReset = () => {
        setForm({ location: "", visitDate: "", visitor: null });
        setSubmitted(false);
    };

    if (submitted && form.visitor) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">예약이 완료되었습니다</h2>
                <p className="text-sm text-gray-500 mb-6">아래 내용으로 방문 예약이 접수되었습니다.</p>
                <dl className="text-left bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
                    <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-gray-500">방문장소</dt>
                        <dd className="text-gray-800">{form.location}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-gray-500">방문일시</dt>
                        <dd className="text-gray-800">{new Date(form.visitDate).toLocaleString("ko-KR")}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-gray-500">방문대상자</dt>
                        <dd className="text-gray-800">{form.visitor.name} ({form.visitor.department})</dd>
                    </div>
                </dl>
                <button
                    onClick={handleReset}
                    className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    새 예약 등록
                </button>
            </div>
        );
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg space-y-6"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">방문 예약</h1>
                    <p className="mt-1 text-sm text-gray-500">방문 정보를 입력하고 예약을 완료하세요.</p>
                </div>

                {/* 방문장소 */}
                <div className="space-y-1.5">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        방문장소 <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="location"
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="예) 본사 2층 회의실 A"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                {/* 방문일시 */}
                <div className="space-y-1.5">
                    <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700">
                        방문일시 <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="visitDate"
                        type="datetime-local"
                        required
                        value={form.visitDate}
                        onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                {/* 방문대상자 */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        방문대상자 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-gray-50 min-h-[42px] flex items-center">
                            {form.visitor ? (
                                <span className="text-gray-800">
                                    {form.visitor.name}
                                    <span className="ml-2 text-xs text-gray-400">{form.visitor.department}</span>
                                </span>
                            ) : (
                                <span className="text-gray-400">검색 버튼을 눌러 선택하세요</span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowSearch(true)}
                            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shrink-0"
                        >
                            검색
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!form.location || !form.visitDate || !form.visitor}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    예약 등록
                </button>
            </form>

            {showSearch && (
                <VisitorSearch
                    onSelect={(visitor) => setForm({ ...form, visitor })}
                    onClose={() => setShowSearch(false)}
                />
            )}
        </>
    );
}
