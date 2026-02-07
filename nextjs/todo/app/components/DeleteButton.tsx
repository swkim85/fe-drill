//  components/DeleteButton.tsx 
'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  todoId: number | string;
  onDelete?: () => void;
}

export default function DeleteButton({ todoId, onDelete }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/todo?id=${todoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (onDelete) {
          onDelete();
        } else {
          // 페이지 새로고침
          window.location.reload();
        }
      } else {
        const error = await response.json();
        alert(`삭제 실패: ${error.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        padding: '0.25rem 0.5rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        opacity: isDeleting ? 0.6 : 1,
      }}
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}


