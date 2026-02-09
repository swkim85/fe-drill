// app/page.tsx

"use client";
//import Image from "next/image";

import { useEffect, useState } from "react";
// "use client" 지시자로 클라이언트 컴포넌트가 올바르게 구성되어 useState, useEffect 훅을 사용할 수 있습

// Next.js 클라이언트 컴포넌트가 /api/items 엔드포인트를 1초마다 폴링하며 데이터를 가져옴 

export default function Home() {

// React의 useState 훅을 사용해 문자열 배열 상태를 선언하는 코드입니다.
// items: 현재 상태 값 (string[] 타입의 배열). 초기값은 빈 배열 []
// setItems: 상태를 업데이트하는 함수
// useState<string[]>([]): TypeScript 제네릭으로 string 배열 타입을 명시하고, 초기값으로 빈 배열 []을 설정

  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

// useEffect는 마운트 시 데이터 페칭을 하고 1초 간격 폴링을 설정하며, 언마운트 시 타이머를 정리해 메모리 누수를 방지
// 1초 폴링은 실시간 업데이트에 적합하지만, 프로덕션에서는 서버 부하를 줄이기 위해 WebSocket이나 Server-Sent Events를 고려하세요

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchItems = () => {
      fetch("/api/items")
        .then((res) => res.json())
        .then((data) => {
          if (data.items) setItems(data.items);
          else setError(data.error || "알 수 없는 에러");
        })
        .catch(() => setError("API 요청 실패"));
    };
    fetchItems();
    timer = setInterval(fetchItems, 1000); // 1초마다 요청
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold mb-8">items 목록</h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <p>항목이 없습니다.</p>
      ) : (
        <ul className="text-xl space-y-2">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

