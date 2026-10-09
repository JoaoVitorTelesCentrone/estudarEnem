"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../../components/site-header";

type Question = {
  title: string;
  index: number;
  year: number;
  context: string | null;
  correctAlternative: string;
  alternativesIntroduction: string | null;
  alternatives: { letter: string; text: string }[];
};

export default function NewExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [amount, setAmount] = useState(90);

  const normalizeAmount = (value: string | null) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 1 && parsed <= 90 ? parsed : 90;
  };

  const load = (requestedAmount = amount) => {
    setLoading(true);
    setError(null);
    setDone(false);
    setCurrent(0);
    setAnswer(null);
    setScore(0);

    fetch(`/api/enem/custom?amount=${requestedAmount}`, { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data.questions as Question[];
      })
      .then(setQuestions)
      .catch((err) => setError(err instanceof Error ? err.message : "Não foi possível criar o simulado."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const initialAmount = normalizeAmount(new URLSearchParams(window.location.search).get("amount"));
    setAmount(initialAmount);
    load(initialAmount);
  }, []);

  const item = questions[current];

  const choose = (letter: string) => {
    if (answer || !item) return;
    setAnswer(letter);
    if (letter === item.correctAlternative) setScore((value) => value + 1);
  };

  const next = () => {
    if (current === questions.length - 1) setDone(true);
    else {
      setCurrent((value) => value + 1);
      setAnswer(null);
    }
  };

  return (
    <main className="challenge-page">
      <SiteHeader active="simulado" />

      <section className="challenge-shell">
        <div className="challenge-head">
          <a href="/simulado" className="back-link">← Voltar aos simulados</a>
          <p className="kicker"><span /> Simulado único</p>
          <h1>Uma prova nova, feita para você.</h1>
          <p>{amount} questões reais, sorteadas entre os anos disponíveis. A combinação muda a cada novo simulado.</p>
          {questions.length > 0 && (
            <div className="progress-row">
              <span>Questão {done ? questions.length : current + 1} de {questions.length}</span>
              <div><i style={{ width: `${((done ? questions.length : current) / questions.length) * 100}%` }} /></div>
            </div>
          )}
        </div>

        {loading && <section className="result-card challenge-loading"><div className="reader-loading"><span /> Montando suas {amount} questões…</div></section>}
        {error && <section className="result-card"><h2>Não foi possível criar agora.</h2><p>{error}</p><button onClick={() => load()}>Tentar novamente</button></section>}

        {!loading && !error && done && (
          <section className="result-card">
            <p className="section-label">SIMULADO FINALIZADO</p>
            <div className="result-score">{score}<span>/{questions.length}</span></div>
            <h2>{score >= Math.ceil(questions.length * 0.8) ? "Excelente ritmo." : "Bom treino."}</h2>
            <p>Você acertou {score} de {questions.length} questões.</p>
            <button onClick={() => load()}>Criar outro simulado</button>
          </section>
        )}

        {!loading && !error && !done && item && (
          <section className="play-card">
            <div className="play-top"><span className="theme-tag">{item.title} · {item.year}</span></div>
            {item.context && <p className="api-context">{item.context}</p>}
            {item.alternativesIntroduction && <p className="alternatives-intro">{item.alternativesIntroduction}</p>}
            <div className="play-options">
              {item.alternatives.map((option) => (
                <button key={option.letter} onClick={() => choose(option.letter)} className={answer === option.letter ? "selected" : ""} disabled={Boolean(answer)}>
                  <b>{option.letter}</b>{option.text}
                </button>
              ))}
            </div>
            {answer && (
              <div className="answer-feedback neutral">
                <b>Resposta registrada.</b>
                <button onClick={next}>{current === questions.length - 1 ? "Finalizar prova" : "Próxima questão →"}</button>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
