import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  if (!year || !/^\d{4}$/.test(year)) return NextResponse.json({ error: "Ano inválido." }, { status: 400 });
  try {
    // A API aceita no máximo 50 itens por página. Buscamos todas as páginas
    // para que a tela do ano realmente mostre a prova completa.
    const questions: unknown[] = [];
    let offset = 0;
    let total = Number.POSITIVE_INFINITY;
    let metadata: Record<string, unknown> = {};

    while (offset < total && offset < 500) {
      const response = await fetch(`https://api.enem.dev/v1/exams/${year}/questions?limit=50&offset=${offset}`, { next: { revalidate: 86400 } });
      if (!response.ok) return NextResponse.json({ error: "Este ano não está disponível." }, { status: response.status });

      const page = await response.json() as { questions?: unknown[]; metadata?: Record<string, unknown> };
      const pageQuestions = Array.isArray(page.questions) ? page.questions : [];
      questions.push(...pageQuestions);
      metadata = page.metadata ?? metadata;
      total = Number(metadata.total ?? questions.length);

      if (pageQuestions.length === 0 || metadata.hasMore === false) break;
      offset += pageQuestions.length;
    }

    return NextResponse.json({ questions, metadata: { ...metadata, limit: 50, offset: 0, total: questions.length, hasMore: false } });
  } catch { return NextResponse.json({ error: "Não foi possível carregar o simulado agora." }, { status: 502 }); }
}
