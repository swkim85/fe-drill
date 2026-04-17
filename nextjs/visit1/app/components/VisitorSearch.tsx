"use client";

import { useState, useEffect, useRef } from "react";
import visitorsData from "../../data/visitors.json";

export interface Visitor {
    id: number;
    name: string;
    department: string;
    email: string;
    phone: string;
}

interface VisitorSearchProps {
    onSelect: (visitor: Visitor) => void;
    onClose: () => void;
}

export default function VisitorSearch(
 { onSelect, onClose }: VisitorSearchProps
) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = (visitorsData as Visitor[]).filter(
        (v) =>
            v.name.includes(query) ||
            v.department.includes(query) ||
            v.email.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        inputRef.current?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">방문대상자 검색</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                        aria-label="닫기"
                    >
                        &times;
                    </button>
                </div>

                {/* Search input */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="이름, 부서, 이메일로 검색"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Results */}
                <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {filtered.length === 0 ? (
                        <li className="px-6 py-8 text-center text-sm text-gray-400">검색 결과가 없습니다.</li>
                    ) : (
                        filtered.map((visitor) => (
                            <li key={visitor.id}>
                                <button
                                    onClick={() => { onSelect(visitor); onClose(); }}
                                    className="w-full text-left px-6 py-3 hover:bg-blue-50 transition-colors flex items-center gap-4"
                                >
                                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
                                        {visitor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{visitor.name}</p>
                                        <p className="text-xs text-gray-500">{visitor.department} · {visitor.phone}</p>
                                    </div>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
