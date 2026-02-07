
// lib/table.tsx 
// 테이블 헤더 생성 함수
export function table_head(head: string) {
  const headers = head.split(',');
  
  return (
    <thead>
      <tr className="bg-gray-100">
        {headers.map((header) => {
          // ":c", ":l", ":r" 형식 파싱
          const parts = header.trim().split(':');
          const label = parts[0];
          const alignType = parts[1];
          
          let alignClass = 'text-center'; // 기본값은 가운데 정렬
          if (alignType === 'c') {
            alignClass = 'text-center';
          } else if (alignType === 'r') {
            alignClass = 'text-right';
          } else if (alignType === 'l') {
            alignClass = 'text-left';
          }
          
          return (
            <th 
              key={label} 
              className={alignClass}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

// 정렬 정보 파싱 헬퍼 함수
function parseAlign(head: string): string[] {
  const headers = head.split(',');
  return headers.map((header) => {
    const parts = header.trim().split(':');
    const alignType = parts[1];
    
    if (alignType === 'c') return 'c';
    if (alignType === 'r') return 'r';
    if (alignType === 'l') return 'l';
    return 'l'; // 기본값은 왼쪽 정렬
  });
}

// 테이블 데이터 생성 함수
// head: 헤더 문자열 (정렬 정보 포함, 예: "ID,제목:l,완료:c")
// rows: 데이터 배열의 배열 (각 행은 셀 값들의 배열)
// cellClasses: 각 셀의 클래스 배열의 배열 (선택적)
// options: 선택적 옵션 객체
export function table_data(head: string, rows: any[][], cellClasses?: any[][], options?: {
  rowKey?: (row: any[], index: number) => string | number; // 행의 고유 키 생성 함수
  rowStyle?: (row: any[], index: number) => React.CSSProperties; // 행 스타일 생성 함수
  cellRender?: (value: any, columnIndex: number, rowIndex: number) => React.ReactNode; // 셀 렌더링 함수
}) {
  // 헤더 문자열에서 각 컬럼의 정렬 정보 추출
  const aligns = parseAlign(head);
  
  return (
    <tbody>
      {/* 각 행을 순회하며 테이블 행 생성 */}
      {rows.map((row, rowIndex) => {
        // 행의 고유 키: 옵션이 제공되면 사용, 없으면 인덱스 사용
        const key = options?.rowKey ? options.rowKey(row, rowIndex) : rowIndex;
        // 행 스타일: 옵션이 제공되면 사용, 없으면 빈 객체
        const rowStyle = options?.rowStyle ? options.rowStyle(row, rowIndex) : {};
        
        return (
          <tr key={key} style={rowStyle}>
            {/* 각 셀을 순회하며 테이블 셀 생성 */}
            {row.map((cell, colIndex) => {
              // 현재 컬럼의 정렬 정보 가져오기 (기본값: 왼쪽 정렬 'l')
              const align = aligns[colIndex] || 'l';
              // 정렬 정보에 따라 CSS 클래스 결정 (c: center, r: right, l: left)
              const alignClass = align === 'c' ? 'c' : align === 'r' ? 'r' : 'l';
              
              // 셀 클래스: cellClasses가 제공되면 사용, 없으면 정렬 클래스만 사용
              const cellClass = cellClasses && cellClasses[rowIndex] && cellClasses[rowIndex][colIndex]
                ? cellClasses[rowIndex][colIndex]
                : alignClass;
              
              // 셀 내용: 렌더링 함수가 제공되면 사용, 없으면 원본 값 사용
              const cellContent = options?.cellRender 
                ? options.cellRender(cell, colIndex, rowIndex)
                : cell;
              
              return (
                <td key={colIndex} className={cellClass}>
                  {cellContent}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

