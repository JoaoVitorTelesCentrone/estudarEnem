import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const YEARS = Array.from({ length: 15 }, (_, index) => 2023 - index);
const INDEXES = Array.from({ length: 180 }, (_, index) => index + 1);
type ApiQuestion = { title: string; index: number; discipline: string; year: number; context: string | null; files: string[]; correctAlternative: string; alternativesIntroduction: string | null; alternatives: { letter: string; text: string; file: string | null; isCorrect: boolean }[] };
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export async function GET() {
  const candidates = shuffle(YEARS.flatMap((year) => INDEXES.map((index) => ({ year, index })))).slice(0, 32);
  const responses = await Promise.allSettled(candidates.map(async candidate => {
    const response = await fetch(`https://api.enem.dev/v1/exams/${candidate.year}/questions/${candidate.index}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Questão ${candidate.year}/${candidate.index} indisponível`);
    return await response.json() as ApiQuestion;
  }));
  const questions = responses.filter((result): result is PromiseFulfilledResult<ApiQuestion> => result.status === "fulfilled" && result.value.alternatives?.length > 0 && Boolean(result.value.context)).map(result => result.value).slice(0, 10);
  if (questions.length < 10) return NextResponse.json({ error: "Não foi possível encontrar 10 questões disponíveis para este desafio.", available: questions.length }, { status: 503 });
  return NextResponse.json({ questions, total: questions.length });
}
