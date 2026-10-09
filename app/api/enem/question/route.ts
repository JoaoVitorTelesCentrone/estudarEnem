import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  const index = request.nextUrl.searchParams.get("index");
  if (!year || !index || !/^\d{4}$/.test(year) || !/^\d+$/.test(index)) {
    return NextResponse.json({ error: "Informe year e index válidos." }, { status: 400 });
  }
  try {
    const response = await fetch(`https://api.enem.dev/v1/exams/${year}/questions/${index}`, { next: { revalidate: 3600 } });
    if (!response.ok) return NextResponse.json({ error: "Esta questão não foi encontrada.", status: response.status }, { status: response.status });
    const question = await response.json();
    return NextResponse.json(question);
  } catch {
    return NextResponse.json({ error: "Não foi possível carregar esta questão agora." }, { status: 502 });
  }
}
