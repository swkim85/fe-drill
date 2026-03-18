
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve(process.cwd(), 'items');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').filter(Boolean);
    const response = { items: lines };
    console.log('response body:', response);
    return NextResponse.json(response);

  } catch (e) {
    return NextResponse.json({ error: 'Unable to read items file.' }, { status: 500 });
  }
}

