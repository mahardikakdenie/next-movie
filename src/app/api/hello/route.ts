import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ name: 'dika ganteng' });
}

export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ message: 'Data received', data: body });
}
