
//  components/ToggleCompleteButton.tsx 
'use client';

import { useState } from 'react';

interface ToggleCompleteButtonProps {
  todoId: number | string;
  completed: boolean;
  onToggle?: () => void;
}

export default function ToggleCompleteButton({ todoId, completed, onToggle }: ToggleCompleteButtonProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(completed);

  const handleToggle = async () => {
    setIsToggling(true);

    try {
      const response = await fetch(`/api/todo?id=${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !currentStatus,
        }),
      });

      if (response.ok) {
        setCurrentStatus(!currentStatus);
        if (onToggle) {
          onToggle();
        } else {
          // 페이지 새로고침
          window.location.reload();
        }
      } else {
        const error = await response.json();
        alert(`상태 변경 실패: ${error.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Toggle Error:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isToggling}
      style={{
        padding: '0.25rem 0.5rem',
        backgroundColor: currentStatus ? '#10b981' : '#6b7280',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
        cursor: isToggling ? 'not-allowed' : 'pointer',
        opacity: isToggling ? 0.6 : 1,
        minWidth: '60px',
      }}
    >
      {isToggling ? '변경 중...' : currentStatus ? '완료' : '미완료'}
    </button>
  );
}

