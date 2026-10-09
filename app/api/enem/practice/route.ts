import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const YEARS = Array.from({ length: 15 }, (_, index) => 2023 - index);
const RANGES = {
  linguagens: [1, 45],
  "ciencias-humanas": [46, 90],
  "ciencias-natureza": [91, 135],
  matematica: [136, 180],
} as const;

type Discipline = keyof typeof RANGES;
type ApiQuestion = {
  title: string;
  index: number;
  discipline: Discipline;
  language: string | null;
  year: number;
  context: string | null;
  correctAlternative: string;
  alternativesIntroduction: string | null;
  alternatives: { letter: string; text: string; file: string | null; isCorrect: boolean }[];
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export async function GET(request: NextRequest) {
  const discipline = request.nextUrl.searchParams.get("discipline") as Discipline | null;
  const amount = Number(request.nextUrl.searchParams.get("amount") ?? 10);

  if (!discipline || !(discipline in RANGES)) return NextResponse.json({ error: "Escolha uma matéria válida." }, { status: 400 });
  if (!Number.isInteger(amount) || amount < 1 || amount > 90) return NextResponse.json({ error: "Escolha entre 1 e 90 questões." }, { status: 400 });

  const [start, end] = RANGES[discipline];
  const indexes = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const perYear = Math.min(10, Math.max(3, Math.ceil(amount / YEARS.length) + 2));
  const candidates = YEARS.flatMap((year) => shuffle(indexes).slice(0, perYear).map((index) => ({ year, index })));

  const results = await Promise.allSettled(candidates.map(async ({ year, index }) => {
    const response = await fetch(`https://api.enem.dev/v1/exams/${year}/questions/${index}`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Questão ${year}/${index} indisponível`);
    return await response.json() as ApiQuestion;
  }));

  const questions = results
    .filter((result): result is PromiseFulfilledResult<ApiQuestion> => result.status === "fulfilled" && result.value.discipline === discipline && Boolean(result.value.correctAlternative) && result.value.alternatives?.length >= 5)
    .map((result) => result.value);

  if (questions.length < amount) return NextResponse.json({ error: "Não foi possível montar essa seleção completa agora. Tente novamente.", available: questions.length }, { status: 503 });
  return NextResponse.json({ questions: shuffle(questions).slice(0, amount), total: amount, discipline });
}
