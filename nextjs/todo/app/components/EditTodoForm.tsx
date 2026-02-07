
// components/EditTodoForm.tsx 
'use client';

import { useState, useEffect } from 'react';

interface EditTodoFormProps {
  todoId: string;
  initialTitle: string;
  initialDescription: string;
}

export default function EditTodoForm({ todoId, initialTitle, initialDescription }: EditTodoFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription || '');
  }, [initialTitle, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/todo?id=${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      if (response.ok) {
        // Todo 목록 페이지로 이동
        window.location.href = '/';
      } else {
        const error = await response.json();
        alert(`오류가 발생했습니다: ${error.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', backgroundColor: '#f9fafb' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          제목 *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            fontSize: '1rem',
          }}
          placeholder="Todo 제목을 입력하세요"
          disabled={isSubmitting}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          설명
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            minHeight: '80px',
            resize: 'vertical',
          }}
          placeholder="Todo 설명을 입력하세요 (선택사항)"
          disabled={isSubmitting}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? '수정 중...' : '수정'}
        </button>
        <button
          type="button"
          onClick={() => window.location.href = '/'}
          disabled={isSubmitting}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
}


