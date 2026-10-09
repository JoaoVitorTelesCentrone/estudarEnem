import { NextRequest, NextResponse } from "next/server";
import { catalog } from "../../../data/catalog";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  if (!year || !/^\d{4}$/.test(year)) return NextResponse.json({ error: "Ano inválido." }, { status: 400 });

  const entries = catalog.filter((question) => String(question.ano) === year);
  if (!entries.length) return NextResponse.json({ error: "Não há questões de Educação Física disponíveis para este ano." }, { status: 404 });

  const results = await Promise.allSettled(entries.map(async (entry) => {
    const response = await fetch(`https://api.enem.dev/v1/exams/${entry.ano}/questions/${entry.numero_catalogo}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Questão ${entry.ano}/${entry.numero_catalogo} indisponível`);
    return await response.json();
  }));

  const questions = results
    .filter((result): result is PromiseFulfilledResult<unknown> => result.status === "fulfilled")
    .map((result) => result.value);

  if (!questions.length) return NextResponse.json({ error: "Não foi possível carregar as questões de Educação Física deste ano." }, { status: 502 });
  return NextResponse.json({ questions, metadata: { total: questions.length } });
}
