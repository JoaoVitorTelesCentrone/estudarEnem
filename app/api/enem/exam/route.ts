import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  if (!year || !/^\d{4}$/.test(year)) return NextResponse.json({ error: "Ano inválido." }, { status: 400 });
  try {
    const response = await fetch(`https://api.enem.dev/v1/exams/${year}/questions?limit=200&offset=0`, { next: { revalidate: 86400 } });
    if (!response.ok) return NextResponse.json({ error: "Este ano não está disponível." }, { status: response.status });
    return NextResponse.json(await response.json());
  } catch { return NextResponse.json({ error: "Não foi possível carregar o simulado agora." }, { status: 502 }); }
}
