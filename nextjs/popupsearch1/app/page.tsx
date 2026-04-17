"use client";

import { useState } from "react";

export default function Home() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="mail-page">
      <main className="mail-shell">
        <header className="mail-header-row">
          <div className="mail-title-wrap">
            <button type="button" className="menu-toggle" aria-label="메뉴">
              <span />
              <span />
              <span />
            </button>
            <h1>메일검색(다닐)</h1>
            <button type="button" className="reload-button" aria-label="새로고침">
              ↻
            </button>
          </div>
          <div className="header-search-group">
            <div className="mini-search-box">
              <input type="text" defaultValue="다닐" aria-label="상단 검색" />
              <button type="button" aria-label="검색">
                🔍
              </button>
            </div>
            <button
              type="button"
              className="detail-toggle"
              onClick={() => setIsDetailOpen((prev) => !prev)}
              aria-expanded={isDetailOpen}
              aria-controls="detail-panel"
            >
              상세 <span>{isDetailOpen ? "⌃" : "⌄"}</span>
            </button>
          </div>
        </header>

        <nav className="mail-toolbar" aria-label="메일 도구">
          <button type="button">팝업쓰기</button>
          <button type="button" disabled>
            전달
          </button>
          <button type="button" disabled>
            답장
          </button>
          <button type="button" disabled>
            전체답장
          </button>
          <button type="button" disabled>
            휴지통
          </button>
          <button type="button" disabled>
            삭제
          </button>
          <button type="button" disabled>
            이동
          </button>
          <button type="button" className="with-caret">
            추가기능 <span>⌄</span>
          </button>
        </nav>

        <section className="mail-content-row">
          <div className="mail-list-panel" role="table" aria-label="검색 결과">
            <div className="table-head" role="rowgroup">
              <div role="columnheader" className="col-check">
                <input type="checkbox" aria-label="전체 선택" />
              </div>
              <div role="columnheader" className="col-star">
                ★
              </div>
              <div role="columnheader" className="col-flag">
                ✉
              </div>
              <div role="columnheader" className="col-sender">
                보낸사람
              </div>
              <div role="columnheader" className="col-subject">
                제목
              </div>
            </div>
            <div className="table-empty" role="row">
              조회된 데이터가 없습니다.
            </div>
          </div>
        </section>

        {isDetailOpen && (
          <div className="detail-modal-layer" onClick={() => setIsDetailOpen(false)}>
            <aside
              id="detail-panel"
              className="detail-panel"
              aria-label="상세 검색"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="detail-title-row">
                <h2>상세</h2>
                <button type="button" aria-label="닫기" onClick={() => setIsDetailOpen(false)}>
                  ✕
                </button>
              </div>

              <div className="detail-grid">
                <label htmlFor="keyword">검색어</label>
                <input id="keyword" type="text" defaultValue="다닐" />

                <label>검색기간</label>
                <div className="date-range">
                  <input type="text" defaultValue="2025-10-18" aria-label="시작일" />
                  <span>~</span>
                  <input type="text" defaultValue="2026-04-16" aria-label="종료일" />
                </div>

                <label htmlFor="folder">메일함</label>
                <select id="folder" defaultValue="INLIODA" aria-label="메일함 선택">
                  <option value="INLIODA">INLIODA</option>
                </select>

                <span>검색조건</span>
                <div className="condition-list">
                  <label>
                    <input type="checkbox" defaultChecked /> 제목
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> 보낸사람
                  </label>
                  <label>
                    <input type="checkbox" /> 받는사람
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> 내용
                  </label>
                  <label>
                    <input type="checkbox" /> 파일명
                  </label>
                </div>
              </div>

              <div className="detail-actions">
                <button type="button" className="primary-btn">
                  검색
                </button>
                <button type="button" className="secondary-btn">
                  초기화
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
