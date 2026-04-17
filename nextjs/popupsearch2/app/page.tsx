"use client";

import { useState } from "react";

export default function Home() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const rows = [
    {
      sender: "노현수",
      title:
        "2026년 4월 사이버보안진단의 날 제출 요청 (4월 24일(금)까지)",
      receivedAt: "14:39",
      size: "10.4K",
      hasAttachment: false,
    },
    {
      sender: "김문수",
      title: "센터회의 공지 드립니다.(4/21(화) 14:00)",
      receivedAt: "13:30",
      size: "2.9K",
      hasAttachment: false,
    },
    {
      sender: "주용희",
      title: "(의견) 전달하는 여름 이메일 처럼 ...",
      receivedAt: "04-07 08:00",
      size: "2.1M",
      hasAttachment: true,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-5 text-[#2f3743] sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-[1160px] rounded-md border border-[#d9dde4] bg-[#f6f7f9] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.03)] sm:p-5">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[#c6cbd2] bg-[#f1f2f4]"
              aria-label="메뉴"
            >
              <span className="relative block h-3.5 w-4">
                <span className="absolute left-0 top-0 h-[1.6px] w-full bg-[#586170]" />
                <span className="absolute left-0 top-[6px] h-[1.6px] w-full bg-[#586170]" />
                <span className="absolute left-0 top-[12px] h-[1.6px] w-full bg-[#586170]" />
              </span>
            </button>
            <h1 className="text-[38px] font-semibold leading-none tracking-[-0.02em] text-[#202938]">
              받은메일함
            </h1>
            <button
              type="button"
              className="text-lg leading-none text-[#7a8595]"
              aria-label="새로고침"
            >
              ↻
            </button>
          </div>

          <div className="relative flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex h-10 w-full min-w-0 items-center rounded-sm border border-[#c7ccd3] bg-white sm:w-[258px]">
              <input
                type="text"
                placeholder="검색"
                className="h-full flex-1 bg-transparent px-3 text-sm text-[#283246] outline-none placeholder:text-[#8c96a5]"
              />
              <button
                type="button"
                className="inline-flex h-full w-11 items-center justify-center border-l border-[#d3d8df] text-[#7a8697]"
                aria-label="검색"
              >
                <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" aria-hidden>
                  <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M13.3 13.4 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsDetailOpen((prev) => !prev)}
              aria-expanded={isDetailOpen}
              aria-controls="detail-search-popup"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-[#c7ccd3] bg-[#f7f8fa] px-4 text-sm font-medium text-[#455063]"
            >
              상세
              <span className="text-[10px] leading-none">▼</span>
            </button>

            {isDetailOpen ? (
              <aside
                id="detail-search-popup"
                className="absolute right-0 top-12 z-20 w-[340px] rounded-sm border border-[#d3d8e1] bg-[#f8f9fb] p-4 shadow-[0_10px_24px_rgba(26,35,51,0.14)]"
                aria-label="상세 검색"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-[#273146]">상세</h2>
                  <button
                    type="button"
                    onClick={() => setIsDetailOpen(false)}
                    className="inline-flex h-7 w-7 items-center justify-center text-xl leading-none text-[#7e8795]"
                    aria-label="닫기"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-2.5">
                  <div className="grid grid-cols-[64px_1fr] items-center gap-2">
                    <label htmlFor="detail-keyword" className="text-sm text-[#5d6677]">
                      검색어
                    </label>
                    <input
                      id="detail-keyword"
                      type="text"
                      className="h-8 rounded-sm border border-[#c8ced8] bg-white px-2.5 text-sm text-[#2a3346] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-[64px_1fr] items-center gap-2">
                    <span className="text-sm text-[#5d6677]">검색기간</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="inline-flex h-8 w-[110px] items-center justify-between rounded-sm border border-[#c8ced8] bg-white px-2.5 text-xs text-[#3d475b]"
                      >
                        <span>2025-10-18</span>
                        <span>📅</span>
                      </button>
                      <span className="text-[#8b93a2]">~</span>
                      <button
                        type="button"
                        className="inline-flex h-8 w-[110px] items-center justify-between rounded-sm border border-[#c8ced8] bg-white px-2.5 text-xs text-[#3d475b]"
                      >
                        <span>2026-04-16</span>
                        <span>📅</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[64px_1fr] items-center gap-2">
                    <label htmlFor="detail-mailbox" className="text-sm text-[#5d6677]">
                      메일함
                    </label>
                    <select
                      id="detail-mailbox"
                      className="h-8 rounded-sm border border-[#c8ced8] bg-white px-2.5 text-sm text-[#39445a] outline-none"
                      defaultValue="받은메일함"
                    >
                      <option value="받은메일함">받은메일함</option>
                      <option value="보낸메일함">보낸메일함</option>
                      <option value="휴지통">휴지통</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-[64px_1fr] items-start gap-2">
                    <span className="pt-1 text-sm text-[#5d6677]">검색조건</span>
                    <div className="space-y-1 text-sm text-[#3c4558]">
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="inline-flex items-center gap-1.5">
                          <input type="checkbox" defaultChecked />
                          <span>제목</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                          <input type="checkbox" defaultChecked />
                          <span>보낸사람</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                          <input type="checkbox" />
                          <span>받는사람</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                          <input type="checkbox" />
                          <span>내용</span>
                        </label>
                      </div>
                      <label className="inline-flex items-center gap-1.5">
                        <input type="checkbox" />
                        <span>파일명</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      className="inline-flex h-8 min-w-[96px] items-center justify-center rounded-sm bg-[#2f3857] px-4 text-sm font-medium text-white"
                    >
                      검색
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 min-w-[64px] items-center justify-center rounded-sm border border-[#d0d5df] bg-[#f3f5f8] px-3 text-sm text-[#657086]"
                    >
                      초기화
                    </button>
                  </div>
                </form>
              </aside>
            ) : null}
          </div>
        </header>

        <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-[#bcc4d0] pb-3">
          {["팝업쓰기", "전달", "답장", "전체답장", "휴지통", "삭제", "이동"].map((item) => (
            <button
              key={item}
              type="button"
              className="h-9 rounded-sm border border-[#d6dae1] bg-[#f2f4f7] px-3 text-sm text-[#465063]"
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            className="h-9 rounded-sm border border-[#c9ced7] bg-white px-3 text-sm text-[#394355]"
          >
            추가기능 ▼
          </button>
        </div>

        <div className="overflow-x-auto border border-[#c9d1dc] bg-[#f7f9fc]">
          <table className="min-w-[930px] w-full text-sm">
            <thead className="bg-[#f3f6fa] text-[#2f3a4b]">
              <tr className="border-b border-[#d2d8e2]">
                <th className="w-11 py-3 text-center font-normal">
                  <input type="checkbox" aria-label="전체선택" />
                </th>
                <th className="w-10 py-3 text-center font-normal">★</th>
                <th className="w-10 py-3 text-center font-normal">✉</th>
                <th className="w-24 py-3 text-left font-semibold">보낸사람</th>
                <th className="py-3 text-left font-semibold">제목</th>
                <th className="w-36 py-3 text-center font-semibold">받은시간</th>
                <th className="w-20 py-3 text-center font-semibold">첨부</th>
                <th className="w-20 py-3 text-center font-semibold">크기</th>
              </tr>
            </thead>
            <tbody className="bg-white text-[#283245]">
              {rows.map((row) => (
                <tr key={`${row.sender}-${row.receivedAt}`} className="border-b border-[#e5e9f0]">
                  <td className="py-3 text-center align-middle">
                    <input type="checkbox" aria-label={`${row.sender} 선택`} />
                  </td>
                  <td className="py-3 text-center align-middle text-[#bac0cb]">★</td>
                  <td className="py-3 text-center align-middle text-[#b7bec9]">✉</td>
                  <td className="py-3 pr-2 font-medium">{row.sender}</td>
                  <td className="max-w-0 py-3 pr-4">
                    <p className="truncate text-[#4c586d]">{row.title}</p>
                  </td>
                  <td className="py-3 text-center text-[#3e4a5f]">{row.receivedAt}</td>
                  <td className="py-3 text-center text-[#8e99aa]">{row.hasAttachment ? "📎" : ""}</td>
                  <td className="py-3 text-center text-[#3f4b60]">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-5 flex flex-col gap-3 text-[#7c8798] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            {[
              "|◀",
              "◀◀",
              "◀",
              "1",
              "▶",
              "▶▶",
              "▶|",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-sm border border-[#d7dce4] bg-[#f6f7fa] px-2 text-xs"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 text-sm">
            <span>총 3 건</span>
            <button
              type="button"
              className="inline-flex h-8 items-center justify-center gap-2 rounded-sm border border-[#cfd5df] bg-white px-3 text-[#4a5569]"
            >
              10
              <span className="text-[10px]">▼</span>
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
