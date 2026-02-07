
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { table_head, table_data } from '@/lib/table';
import { formatDate } from '@/lib/date';
import Link from 'next/link';
import DeleteButton from './components/DeleteButton';
import ToggleCompleteButton from './components/ToggleCompleteButton';


async function getTodos() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.execute("select * from todo");
    return rows;
  } catch (error) {
    console.error('DB Error:', error);
    return [];
  } finally {
    if (conn) conn.release();
  }
}

export default async function Home() {
  let conn;

  const todos = await getTodos();
  //console.log(todos);

  const emptyMessage = todos.length === 0 ? (
    <p style={{ color: '#666' }}>Todo가 없습니다.</p>
  ) : null;

  const head = "ID,제목,설명,완료,생성일,수정,삭제";
  const hdr = table_head(head);

  const title = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <h1 style={{ margin: 0 }}>Todo 목록 ({todos.length}개)</h1>
      <Link 
        href="/todo/new" 
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.25rem',
          fontSize: '0.9rem'
        }}
      >
        + 새 Todo 추가
      </Link>
    </div>
  );
  
  // 데이터를 배열로 모음 (for 루프 사용)
  const tableRows: any[][] = [];
  const tableClss: any[][] = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    console.log(todo);

    const clss: any[] = []; // cell class
    const data: any[] = [];

    clss.push('c'); data.push(todo.id);
    clss.push('c'); data.push(todo.title);
    clss.push('l'); data.push(todo.description || '-');

    // 완료 상태 토글 버튼을 위한 데이터 저장
    clss.push('c'); 
    data.push({ id: todo.id, completed: todo.completed });

    // 날짜를 YYYY-MM-DD 형식으로 포맷팅
    console.log(todo.created_at);
    clss.push('c'); data.push(formatDate(todo.created_at));
    
    // 수정 버튼을 React 요소 객체로 직접 push
    // todo.id를 문자열로 변환 (BigInt일 수 있음)
    const todoIdStr = String(todo.id);
    clss.push('c'); 
    data.push(
      <Link 
        key={`edit-${todoIdStr}`}
        href={`/todo/${todoIdStr}/edit`}
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: '#f59e0b',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          display: 'inline-block',
        }}
      >
        수정
      </Link>
    );
    
    // 삭제 버튼을 React 요소 객체로 직접 push
    clss.push('c'); 
    data.push(<DeleteButton key={`delete-${todoIdStr}`} todoId={todoIdStr} />);

    tableClss.push(clss);
    tableRows.push(data);
  }
  
  // table_data 함수로 한꺼번에 처리 (tableClss와 tableRows 사용)
  const tbody = table_data(head, tableRows, tableClss, {
    rowKey: (row, index) => todos[index].id,
    cellRender: (value, colIndex, rowIndex) => {
      // 제목은 굵게 표시
      if (colIndex === 1) {
        return <strong>{value}</strong>;
      }
      // 완료 상태 토글 버튼 (컬럼 인덱스 3)
      if (colIndex === 3 && typeof value === 'object' && value.id !== undefined) {
        return <ToggleCompleteButton todoId={value.id} completed={value.completed} />;
      }
      // 수정/삭제 버튼은 이미 React 요소 객체로 push되어 있으므로 그대로 반환
      return value;
    }
  });

  const table = todos.length > 0 ? (
    <table className="maindata border-collapse w-full">{hdr}{tbody}</table>
  ) : null;
  
  const main = (
    <main style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      {title}
      {emptyMessage}
      {table}
    </main>
  );

  return main;

}

