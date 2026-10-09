import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const YEARS = Array.from({ length: 15 }, (_, index) => 2023 - index);
const QUESTIONS_PER_EXAM = 90;

type ApiQuestion = {
  title: string;
  index: number;
  discipline: string;
  language: string | null;
  year: number;
  context: string | null;
  files: string[];
  correctAlternative: string;
  alternativesIntroduction: string | null;
  alternatives: { letter: string; text: string; file: string | null; isCorrect: boolean }[];
};

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export async function GET(request: NextRequest) {
  const rawAmount = request.nextUrl.searchParams.get("amount");
  const amount = rawAmount ? Number(rawAmount) : QUESTIONS_PER_EXAM;

  if (!Number.isInteger(amount) || amount < 1 || amount > QUESTIONS_PER_EXAM) {
    return NextResponse.json({ error: "Escolha entre 1 e 90 questões." }, { status: 400 });
  }

  const indexes = Array.from({ length: 180 }, (_, index) => index + 1);
  // Para provas maiores, buscamos uma piscina de 90 opções e só depois
  // recortamos a quantidade escolhida. Assim, algumas falhas pontuais não
  // impedem a criação de um simulado de 45, 60 ou 90 questões.
  const questionsPerYear = amount <= YEARS.length ? 2 : 6;
  const candidates = YEARS.flatMap((year) =>
    shuffle(indexes)
      .slice(0, questionsPerYear)
      .map((index) => ({ year, index })),
  );

  const results = await Promise.allSettled(
    candidates.map(async ({ year, index }) => {
      const response = await fetch(`https://api.enem.dev/v1/exams/${year}/questions/${index}`, {
        next: { revalidate: 86400 },
      });
      if (!response.ok) throw new Error(`Questão ${year}/${index} indisponível`);
      return (await response.json()) as ApiQuestion;
    }),
  );

  const questions = results
    .filter(
      (result): result is PromiseFulfilledResult<ApiQuestion> =>
        result.status === "fulfilled" &&
        Boolean(result.value.correctAlternative) &&
        result.value.alternatives?.length >= 5,
    )
    .map((result) => result.value);

  if (questions.length < amount) {
    return NextResponse.json(
      {
        error: `Não foi possível montar ${amount} questões completas agora.`,
        available: questions.length,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    questions: shuffle(questions).slice(0, amount),
    total: amount,
    years: YEARS,
  });
}
