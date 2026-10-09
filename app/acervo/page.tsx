"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../components/site-header";

type Discipline = "linguagens" | "matematica" | "ciencias-humanas" | "ciencias-natureza";
type Question = {
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

const subjects: { value: Discipline; label: string }[] = [
  { value: "linguagens", label: "Linguagens" },
  { value: "matematica", label: "Matemática" },
  { value: "ciencias-humanas", label: "Ciências Humanas" },
  { value: "ciencias-natureza", label: "Ciências da Natureza" },
];

export default function AcervoPage() {
  const [discipline, setDiscipline] = useState<Discipline>("linguagens");
  const [amount, setAmount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeQuestion(); };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", onKey); };
  }, [selected]);

  const closeQuestion = () => { setSelected(null); setAnswer(null); };
  const openQuestion = (question: Question) => { setSelected(question); setAnswer(null); };
  const subjectName = subjects.find((subject) => subject.value === discipline)?.label ?? "Matéria";

  const buildList = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);
    setHasLoaded(true);
    setQuestions([]);
    try {
      const response = await fetch(`/api/enem/practice?discipline=${discipline}&amount=${amount}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Não foi possível selecionar as questões.");
      setQuestions(data.questions as Question[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível selecionar as questões.");
    } finally {
      setLoading(false);
    }
  };

  const correctLetter = selected?.correctAlternative ?? "";
  const correctText = selected?.alternatives.find((option) => option.letter === correctLetter)?.text ?? "";

  return <main className="inner-page"><SiteHeader active="acervo" />
    <section className="page-hero"><p className="kicker"><span /> Questões ENEM</p><h1>Monte seu treino por matéria.</h1><p>Escolha a área e a quantidade de questões que quer praticar agora.</p></section>
    <section className="archive-layout practice-layout">
      <div className="archive-content">
        <form className="practice-builder" onSubmit={buildList}>
          <div><label htmlFor="discipline">Matéria</label><select id="discipline" value={discipline} onChange={(event) => setDiscipline(event.target.value as Discipline)}>{subjects.map((subject) => <option key={subject.value} value={subject.value}>{subject.label}</option>)}</select></div>
          <div><label htmlFor="amount">Quantidade de questões</label><input id="amount" type="number" min="1" max="90" value={amount} onChange={(event) => setAmount(Math.max(1, Math.min(90, Number(event.target.value) || 1)))} /></div>
          <button className="button primary" type="submit" disabled={loading}>{loading ? "Montando questões…" : "Selecionar questões"}</button>
        </form>
        {loading && <div className="result-card challenge-loading"><div className="reader-loading"><span /> Selecionando {amount} questões de {subjectName}…</div></div>}
        {!loading && error && <div className="result-card"><h2>Não foi possível montar a seleção.</h2><p>{error}</p><button onClick={() => void buildList()}>Tentar novamente</button></div>}
        {!loading && !error && hasLoaded && <><p className="result-count">{questions.length} questões de {subjectName} selecionadas.</p><div className="question-list">{questions.map((question) => <article key={`${question.year}-${question.index}`}><div className="question-year">{question.year}</div><div><span className="theme-tag">{subjectName}{question.language ? ` · ${question.language}` : ""}</span><h2>{question.title}</h2><p>Questão {question.index}</p></div><button className="question-open" onClick={() => openQuestion(question)}>Responder →</button></article>)}</div></>}
        {!loading && !error && !hasLoaded && <div className="topic-empty practice-empty"><p className="section-label">COMECE POR AQUI</p><h2>Escolha sua matéria<br />e defina seu ritmo.</h2><p>Você pode selecionar de 1 a 90 questões por vez.</p></div>}
      </div>
    </section>
    {selected && <div className="question-modal-backdrop" onMouseDown={closeQuestion}><section className="question-reader" id="question-reader" role="dialog" aria-modal="true" aria-labelledby="question-title" onMouseDown={(event) => event.stopPropagation()}><div className="reader-top"><span className="theme-tag">ENEM {selected.year} · {subjects.find((subject) => subject.value === selected.discipline)?.label}</span><button onClick={closeQuestion} aria-label="Fechar questão">Fechar ×</button></div><h2 id="question-title">{selected.title}</h2>{selected.context && <p className="reader-statement">{selected.context}</p>}{selected.alternativesIntroduction && <p className="alternatives-intro">{selected.alternativesIntroduction}</p>}<div className="reader-options">{selected.alternatives.map((option) => <button key={option.letter} className={answer === option.letter ? (answer === correctLetter ? "answer-right" : "answer-wrong") : ""} onClick={() => setAnswer(option.letter)}><b>{option.letter}</b><span>{option.text}</span></button>)}</div>{answer && <div className={answer === correctLetter ? "reader-feedback good" : "reader-feedback"}><b>{answer === correctLetter ? "Resposta correta." : `Você marcou ${answer}. A resposta correta é ${correctLetter}.`}</b><p>{answer === correctLetter ? `Você acertou a alternativa ${correctLetter}.` : `A alternativa correta é: ${correctText}`}</p></div>}</section></div>}
  </main>;
}
