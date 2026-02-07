// app/todo/new/page.tsx 
import TodoForm from '../../components/TodoForm';
import Link from 'next/link';

export default function NewTodoPage() {
  return (
    <main style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Todo 목록으로 돌아가기
        </Link>
      </div>
      <h1>새 Todo 추가</h1>
      <TodoForm />
    </main>
  );
}

