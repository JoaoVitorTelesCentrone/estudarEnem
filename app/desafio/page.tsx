"use client";

import { useCallback, useEffect, useState } from "react";
import SiteHeader from "../components/site-header";

type WeeklyQuestion = { title: string; index: number; discipline: string; year: number; context: string | null; correctAlternative: string; alternativesIntroduction: string | null; alternatives: { letter: string; text: string; isCorrect: boolean }[] };

export default function DesafioPage() {
  const [questions, setQuestions] = useState<WeeklyQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const loadChallenge = useCallback(async () => {
    setLoading(true); setError(null); setDone(false); setCurrent(0); setAnswer(null); setScore(0);
    try {
      const response = await fetch("/api/enem/weekly", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Não foi possível montar o desafio.");
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível montar o desafio agora.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadChallenge(); }, [loadChallenge]);

  const item = questions[current];
  const choose = (letter: string) => { if (answer !== null || !item) return; setAnswer(letter); if (letter === item.correctAlternative) setScore((value) => value + 1); };
  const next = () => { if (current === questions.length - 1) setDone(true); else { setCurrent((value) => value + 1); setAnswer(null); } };

  return (
    <main className="challenge-page">
      <SiteHeader active="desafio" />
      <section className="challenge-shell">
        <div className="challenge-head">
          <a href="/" className="back-link">← Voltar ao início</a>
          <p className="kicker"><span /> Desafio semanal</p>
          <h1>Seu treino começa agora.</h1>
          <p>Dez questões aleatórias para responder no seu ritmo e acompanhar seu desempenho.</p>
          {questions.length > 0 && <div className="progress-row"><span>Questão {done ? questions.length : current + 1} de {questions.length}</span><div aria-label={`${Math.round(((done ? questions.length : current) / questions.length) * 100)}% concluído`}><i style={{ width: `${((done ? questions.length : current) / questions.length) * 100}%` }} /></div></div>}
        </div>
        {loading && <section className="result-card challenge-loading"><div className="reader-loading"><span /> Buscando 10 questões aleatórias…</div></section>}
        {!loading && error && <section className="result-card"><p className="section-label">DESAFIO INDISPONÍVEL</p><h2>Não consegui montar as 10 questões.</h2><p>{error}</p><button onClick={() => void loadChallenge()}>Tentar novamente</button></section>}
        {!loading && !error && done && <section className="result-card"><p className="section-label">DESAFIO CONCLUÍDO</p><div className="result-score">{score}<span>/{questions.length}</span></div><h2>{score === questions.length ? "Desafio concluído." : "Treino concluído."}</h2><p>Você acertou {score} de {questions.length} questões.</p><button onClick={() => void loadChallenge()}>Sortear outras 10</button><a href="/acervo">Revisar no acervo</a></section>}
        {!loading && !error && !done && item && <section className="play-card"><div className="play-top"><span className="theme-tag">{item.discipline} · ENEM {item.year}</span></div>{item.context && <p className="api-context">{item.context}</p>}{item.alternativesIntroduction && <p className="alternatives-intro">{item.alternativesIntroduction}</p>}<div className="play-options">{item.alternatives.map((option) => <button onClick={() => choose(option.letter)} className={answer === option.letter ? (option.letter === item.correctAlternative ? "right" : "wrong") : ""} disabled={answer !== null} key={option.letter}><b>{option.letter}</b>{option.text}</button>)}</div>{answer && <div className={answer === item.correctAlternative ? "answer-feedback correct" : "answer-feedback"}><b>{answer === item.correctAlternative ? "Resposta correta." : `Você marcou ${answer}. A resposta correta é ${item.correctAlternative}.`}</b><p>{answer === item.correctAlternative ? "Boa leitura." : `A alternativa correta é: ${item.alternatives.find((option) => option.letter === item.correctAlternative)?.text}`}</p><button onClick={next}>{current === questions.length - 1 ? "Ver resultado" : "Próxima questão →"}</button></div>}</section>}
      </section>
    </main>
  );
}
