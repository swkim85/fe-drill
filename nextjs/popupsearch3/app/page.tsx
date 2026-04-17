"use client";
import { useState } from "react";

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const [startDate, setStartDate] = useState("2025-10-18");
  const [endDate, setEndDate] = useState("2026-04-16");
  const emails = [
    {
      id: 1,
      starred: false,
      icon: "📧",
      sender: "노현지",
      subject:
        "2026년 4월 사이버보안인식의 날 Windows 및 Mac PC 점검 결과 계속 요청 (4월 24일(금)까지)",
      time: "14:39",
      hasAttach: true,
      size: "10.4K",
    },
    {
      id: 2,
      starred: false,
      icon: "📧",
      sender: "경기은",
      subject: "산티회의 공지 드립니다.(4/21(화) 14:00)",
      time: "13:30",
      hasAttach: false,
      size: "2.9K",
    },
    {
      id: 3,
      starred: false,
      icon: "📧",
      sender: "신송주",
      subject:
        "(의견) 전달하는 여행 이메일 처럼 다름어항게 회원 가입 이벤트를 하면 어떨까요?",
      time: "04-07 08:00",
      hasAttach: true,
      size: "2.1M",
    },
  ];

  return (
    <div className="inbox-wrap">
      {/* 헤더 */}
      <div className="inbox-header">
        <h1>받은메일함</h1>
        <button className="refresh-btn" title="새로고침">↻</button>
      </div>

      {/* 툴바 */}
      <div className="inbox-toolbar">
        <button className="toolbar-btn">답장보기</button>
        <button className="toolbar-btn">전달</button>
        <button className="toolbar-btn">전체답장</button>
        <button className="toolbar-btn">모치읍</button>
        <button className="toolbar-btn">딕색</button>
        <button className="toolbar-btn">북마</button>
        <div className="toolbar-separator" />
        <button className="toolbar-btn">이후기능 ▾</button>
      </div>

      {/* 검색바 */}
      <div className="inbox-searchbar">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="search-input-wrap">
            <input type="text" placeholder="검색" />
            <button title="검색">🔍</button>
          </div>
          <button className="detail-btn" onClick={() => setShowDetail(true)}>상세 ▾</button>
        </div>
        <div className="view-toggle">
          <button className="active" title="목록형">☰</button>
          <button title="요약형">▤</button>
          <button title="미리보기">⊞</button>
        </div>
      </div>

      {/* 상세 검색 팝업 */}
      {showDetail && (
        <div className="popup-overlay" onClick={() => setShowDetail(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <span className="popup-title">상세</span>
              <button className="popup-close" onClick={() => setShowDetail(false)}>×</button>
            </div>
            <div className="popup-body">
              <div className="popup-row">
                <label className="popup-label">검색어</label>
                <div className="popup-field">
                  <input type="text" className="popup-input" />
                </div>
              </div>
              <div className="popup-row">
                <label className="popup-label">검색기간</label>
                <div className="popup-field" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input
                    type="date"
                    className="popup-input-date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                  <span style={{ color: "#888" }}>~</span>
                  <input
                    type="date"
                    className="popup-input-date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
              </div>
              <div className="popup-row">
                <label className="popup-label">메일함</label>
                <div className="popup-field">
                  <select className="popup-select">
                    <option>받은메일함</option>
                    <option>보낸메일함</option>
                    <option>임시보관함</option>
                    <option>휴지통</option>
                  </select>
                </div>
              </div>
              <div className="popup-row" style={{ alignItems: "flex-start" }}>
                <label className="popup-label" style={{ paddingTop: "4px" }}>검색조건</label>
                <div className="popup-field">
                  <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                    <label className="popup-check"><input type="checkbox" defaultChecked /> 제목</label>
                    <label className="popup-check"><input type="checkbox" defaultChecked /> 보내는사람</label>
                    <label className="popup-check"><input type="checkbox" /> 받는사람</label>
                    <label className="popup-check"><input type="checkbox" /> 내용</label>
                  </div>
                  <div style={{ display: "flex", gap: "14px", marginTop: "6px" }}>
                    <label className="popup-check"><input type="checkbox" /> 파일명</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <button className="popup-btn-search">검색</button>
              <button
                className="popup-btn-reset"
                onClick={() => {
                  setStartDate("2025-10-18");
                  setEndDate("2026-04-16");
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 총 건수 */}
      <div className="inbox-meta">총 3건</div>

      {/* 테이블 */}
      <table className="inbox-table">
        <thead>
          <tr>
            <th className="col-check"><input type="checkbox" /></th>
            <th className="col-star">★</th>
            <th className="col-icon"></th>
            <th className="col-sender">보낸사람</th>
            <th className="col-subject">제목</th>
            <th className="col-time">받은시간</th>
            <th className="col-attach">첨부</th>
            <th className="col-size">크기</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((mail) => (
            <tr key={mail.id}>
              <td className="col-check"><input type="checkbox" /></td>
              <td className="col-star">
                <button className={`star-btn${mail.starred ? " starred" : ""}`}>
                  {mail.starred ? "★" : "☆"}
                </button>
              </td>
              <td className="col-icon">✉</td>
              <td className="col-sender">{mail.sender}</td>
              <td className="col-subject">
                <a href="#">{mail.subject}</a>
              </td>
              <td className="col-time">{mail.time}</td>
              <td className="col-attach">{mail.hasAttach ? "📎" : ""}</td>
              <td className="col-size">{mail.size}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="inbox-footer">
        <button className="page-btn" disabled>«</button>
        <button className="page-btn" disabled>‹</button>
        <button className="page-btn current">1</button>
        <button className="page-btn" disabled>›</button>
        <button className="page-btn" disabled>»</button>
        <div className="per-page-wrap">
          <select defaultValue="10">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}

