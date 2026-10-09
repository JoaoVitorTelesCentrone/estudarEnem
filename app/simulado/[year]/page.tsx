"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../components/site-header";

type Alternative = { letter: string; text: string };
type Question = {
  title: string;
  index: number;
  discipline: string;
  language: string | null;
  context: string | null;
  correctAlternative: string;
  alternativesIntroduction: string | null;
  alternatives: Alternative[];
};

export default function YearExamPage() {
  const params = useParams<{ year: string }>();
  const year = params.year;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setCurrent(0);
    setAnswers({});
    setDone(false);

    fetch(`/api/enem/exam?year=${year}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Não foi possível carregar esta prova.");
        return data.questions as Question[];
      })
      .then((items) => {
        if (!active) return;
        if (!items.length) throw new Error("Não há questões disponíveis para este ano.");
        setQuestions(items);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Não foi possível carregar esta prova.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [year]);

  const item = questions[current];
  const answer = item ? answers[item.index] : undefined;
  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.index] === question.correctAlternative ? 1 : 0), 0),
    [answers, questions],
  );

  const choose = (letter: string) => {
    if (!item || answer) return;
    setAnswers((value) => ({ ...value, [item.index]: letter }));
  };

  const next = () => {
    if (current === questions.length - 1) setDone(true);
    else setCurrent((value) => value + 1);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setDone(false);
  };

  return (
    <main className="challenge-page">
      <SiteHeader active="simulado" />
      <section className="challenge-shell">
        <div className="challenge-head">
          <a href="/simulado" className="back-link">← Voltar aos simulados</a>
          <p className="kicker"><span /> Prova ENEM {year}</p>
          <h1>Faça a prova de {year}.</h1>
          <p>Responda uma questão por vez. O resultado aparece somente quando você concluir a prova.</p>
          {questions.length > 0 && !loading && !error && (
            <div className="progress-row" aria-label={`Progresso: questão ${done ? questions.length : current + 1} de ${questions.length}`}>
              <span>Questão {done ? questions.length : current + 1} de {questions.length}</span>
              <div><i style={{ width: `${((done ? questions.length : current) / questions.length) * 100}%` }} /></div>
            </div>
          )}
        </div>

        {loading && <section className="result-card challenge-loading"><div className="reader-loading"><span /> Preparando a prova de {year}…</div></section>}
        {error && <section className="result-card"><h2>Não foi possível abrir esta prova.</h2><p>{error}</p><a className="button primary" href="/simulado">Escolher outro ano</a></section>}

        {!loading && !error && done && (
          <section className="result-card">
            <p className="section-label">PROVA FINALIZADA</p>
            <div className="result-score">{score}<span>/{questions.length}</span></div>
            <h2>{score >= Math.ceil(questions.length * 0.8) ? "Excelente desempenho." : "Prova concluída."}</h2>
            <p>Você acertou {score} de {questions.length} questões da edição de {year}.</p>
            <button onClick={restart}>Refazer esta prova</button>
            <a href="/simulado">Escolher outro ano</a>
          </section>
        )}

        {!loading && !error && !done && item && (
          <section className="play-card">
            <div className="play-top"><span className="theme-tag">{item.discipline}{item.language ? ` · ${item.language}` : ""}</span><span>{item.title}</span></div>
            {item.context && <p className="api-context">{item.context}</p>}
            {item.alternativesIntroduction && <p className="alternatives-intro">{item.alternativesIntroduction}</p>}
            <div className="play-options">
              {item.alternatives.map((option) => (
                <button key={option.letter} onClick={() => choose(option.letter)} className={answer === option.letter ? "selected" : ""} disabled={Boolean(answer)}>
                  <b>{option.letter}</b>{option.text}
                </button>
              ))}
            </div>
            {answer && <div className="answer-feedback neutral" aria-live="polite"><b>Resposta registrada.</b><button onClick={next}>{current === questions.length - 1 ? "Finalizar prova" : "Próxima questão →"}</button></div>}
          </section>
        )}
      </section>
    </main>
  );
}
