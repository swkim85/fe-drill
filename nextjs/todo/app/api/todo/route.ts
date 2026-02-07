
 //app/api/todo/route.ts 

import { NextResponse } from 'next/server';
import pool from '@/lib/db';


export async function POST(request: Request) {
  let conn;
  try {
    const body = await request.json();
    const { title, description, completed } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: '제목은 필수입니다.' }, { status: 400 });
    }

    conn = await pool.getConnection();
    
    const result = await conn.query(
      'INSERT INTO todo (title, description, completed, created_at) VALUES (?, ?, ?, NOW())',
      [title.trim(), description?.trim() || null, completed || false]
    );

    return NextResponse.json({ 
      success: true, 
      id: typeof result.insertId === 'bigint' ? result.insertId.toString() : result.insertId,
      message: 'Todo가 추가되었습니다.' 
    }, { status: 201 });
  } catch (err: any) {
    console.error('POST Error:', err);
    return NextResponse.json({ error: err.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

export async function PUT(request: Request) {
  let conn;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { title, description } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 });
    }

    if (!title || !title.trim()) {
      return NextResponse.json({ error: '제목은 필수입니다.' }, { status: 400 });
    }

    conn = await pool.getConnection();
    
    const result = await conn.query(
      'UPDATE todo SET title = ?, description = ? WHERE id = ?',
      [title.trim(), description?.trim() || null, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Todo를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Todo가 수정되었습니다.' 
    });
  } catch (err: any) {
    console.error('PUT Error:', err);
    return NextResponse.json({ error: err.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

export async function PATCH(request: Request) {
  let conn;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { completed } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 });
    }

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'completed 값이 필요합니다.' }, { status: 400 });
    }

    conn = await pool.getConnection();
    
    const result = await conn.query(
      'UPDATE todo SET completed = ? WHERE id = ?',
      [completed, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Todo를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: `Todo가 ${completed ? '완료' : '미완료'}로 변경되었습니다.` 
    });
  } catch (err: any) {
    console.error('PATCH Error:', err);
    return NextResponse.json({ error: err.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

export async function DELETE(request: Request) {
  let conn;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 });
    }

    conn = await pool.getConnection();
    
    const result = await conn.query(
      'DELETE FROM todo WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Todo를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Todo가 삭제되었습니다.' 
    });
  } catch (err: any) {
    console.error('DELETE Error:', err);
    return NextResponse.json({ error: err.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

