
//  lib/date.ts 
// 날짜를 YYYY-MM-DD 형식으로 포맷팅하는 함수
export function formatDate(date: Date | string | any): string {
  // Date 객체가 아닌 경우 Date로 변환
  let d: Date;
  
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'string') {
    d = new Date(date);
  } else {
    // 다른 타입인 경우 문자열로 변환 후 Date 생성
    d = new Date(String(date));
  }

  // 유효한 Date 객체인지 확인
  if (isNaN(d.getTime())) {
    console.error('Invalid date:', date);
    return 'Invalid Date';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

