import { NextRequest, NextResponse } from "next/server";
import { catalog } from "../../../data/catalog";

export const dynamic = "force-dynamic";

type ApiQuestion = {
  title: string;
  index: number;
  discipline: string;
  language: string | null;
  year: number;
  context: string | null;
  correctAlternative: string;
  alternativesIntroduction: string | null;
  alternatives: { letter: string; text: string; file: string | null; isCorrect: boolean }[];
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export async function GET(request: NextRequest) {
  const amount = Number(request.nextUrl.searchParams.get("amount") ?? catalog.length);
  if (!Number.isInteger(amount) || amount < 1 || amount > catalog.length) return NextResponse.json({ error: `Escolha entre 1 e ${catalog.length} questões de Educação Física.` }, { status: 400 });

  const candidates = shuffle(catalog).slice(0, amount);
  const results = await Promise.allSettled(candidates.map(async (candidate) => {
    const response = await fetch(`https://api.enem.dev/v1/exams/${candidate.ano}/questions/${candidate.numero_catalogo}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Questão ${candidate.ano}/${candidate.numero_catalogo} indisponível`);
    return await response.json() as ApiQuestion;
  }));

  const questions = results
    .filter((result): result is PromiseFulfilledResult<ApiQuestion> => result.status === "fulfilled" && Boolean(result.value.correctAlternative) && result.value.alternatives?.length >= 5)
    .map((result) => result.value);

  if (questions.length < amount) return NextResponse.json({ error: `Não foi possível montar ${amount} questões de Educação Física agora.`, available: questions.length }, { status: 503 });
  return NextResponse.json({ questions: shuffle(questions), total: amount });
}
