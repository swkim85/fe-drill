
//  app/todo/\[id\]/edit/page.tsx 
import pool from '@/lib/db';
import EditTodoForm from '../../../components/EditTodoForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getTodo(id: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    // ID를 숫자로 변환하여 쿼리 (BigInt일 수 있음)
    const todoId = Number(id);
    const rows = await conn.execute('SELECT * FROM todo WHERE id = ?', [todoId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('DB Error:', error);
    return null;
  } finally {
    if (conn) conn.release();
  }
}

export default async function EditTodoPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Next.js 15+에서 params가 Promise일 수 있음
  const resolvedParams = 'then' in params ? await params : params;
  const todoId = resolvedParams.id;
  const todo = await getTodo(todoId);

  if (!todo) {
    notFound();
  }

  return (
    <main style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Todo 목록으로 돌아가기
        </Link>
      </div>
      <h1>Todo 수정</h1>
      <EditTodoForm 
        todoId={todoId}
        initialTitle={todo.title}
        initialDescription={todo.description || ''}
      />
    </main>
  );
}


