"use client";

import { useMemo, useState } from "react";
import { redacaoTopics } from "../data/redacao";
import SiteHeader from "../components/site-header";

const pickTopic = (currentId: string | undefined, category: string) => {
  const pool = redacaoTopics.filter((topic) => (!category || topic.categoria === category) && topic.id !== currentId);
  return pool[Math.floor(Math.random() * pool.length)] ?? redacaoTopics[0];
};

export default function RedacaoPage() {
  const categories = useMemo(() => Array.from(new Set(redacaoTopics.map((topic) => topic.categoria))), []);
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState<(typeof redacaoTopics)[number] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [essay, setEssay] = useState("");
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const draw = () => {
    setTopic((previous) => pickTopic(previous?.id, category));
    setShowDetails(false);
    setEssay("");
    setEvaluation(null);
    setEvaluationError(null);
  };

  const evaluate = async () => {
    if (!topic || !essay.trim()) return;
    setEvaluating(true);
    setEvaluation(null);
    setEvaluationError(null);
    try {
      const response = await fetch("/api/redacao/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "openai",
          essay,
          topic: { titulo: topic.titulo, enunciado: topic.enunciado },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Não foi possível avaliar sua redação.");
      setEvaluation(data.evaluation);
    } catch (error) {
      setEvaluationError(error instanceof Error ? error.message : "Não foi possível avaliar sua redação.");
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <main className="writing-page">
      <SiteHeader active="redacao" />

      <section className="writing-hero">
        <div>
          <a href="/" className="back-link">← Voltar ao início</a>
          <p className="kicker"><span /> Laboratório de redação</p>
          <h1>Uma ideia para colocar no papel.</h1>
          <p>Sorteie um tema, escreva sua redação e peça uma avaliação pedagógica para descobrir seus próximos passos.</p>
          <div className="writing-controls">
            <label htmlFor="category">Quero treinar sobre</label>
            <select id="category" value={category} onChange={(event) => { setCategory(event.target.value); setTopic(null); setEvaluation(null); }}>
              <option value="">Todos os assuntos</option>
              {categories.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
            <button className="button primary" onClick={draw}>Sortear um tema <span aria-hidden="true">↗</span></button>
          </div>
          <p className="writing-note">{redacaoTopics.length} propostas autorais para treino · não são previsões oficiais do ENEM</p>
        </div>
        <div className="writing-orbit" aria-hidden="true"><span>RASCUNHO</span><b>✦</b><i>ARGUMENTO</i></div>
      </section>

      <section className="topic-stage" aria-live="polite">
        {topic ? (
          <article className="topic-card">
            <div className="topic-card-top"><span>{topic.categoria}</span><small>{topic.dificuldade} · {topic.ano_referencia}</small></div>
            <p className="topic-number">{topic.id}</p>
            <h2>{topic.titulo}</h2>
            <p className="topic-prompt">{topic.enunciado}</p>
            <div className="topic-actions">
              <button className="button primary" onClick={draw}>Sortear outro <span aria-hidden="true">↗</span></button>
              <button className="button quiet" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Esconder roteiro" : "Ver roteiro de reflexão"}</button>
            </div>
            {showDetails && <div className="topic-details"><div><h3>Perguntas para começar</h3><ul>{topic.questoes_norteadoras.map((question) => <li key={question}>{question}</li>)}</ul></div><div><h3>Repertórios para pesquisar</h3><ul>{topic.repertorios_para_pesquisar.map((source) => <li key={source}>{source}</li>)}</ul></div></div>}

            <div className="essay-evaluator">
              <div className="essay-evaluator-head">
                <div><p className="section-label">AVALIAR REDAÇÃO</p><h3>Escreva e receba uma devolutiva</h3></div>
                <span>Seu texto fica no seu navegador e é enviado somente para avaliação.</span>
              </div>
              <label htmlFor="essay">Sua redação</label>
              <textarea id="essay" value={essay} onChange={(event) => setEssay(event.target.value)} placeholder="Digite ou cole sua redação aqui…" rows={14} maxLength={20000} />
              <div className="essay-evaluator-actions">
                <button className="button primary" onClick={evaluate} disabled={evaluating || essay.trim().length < 80}>{evaluating ? "Avaliando…" : "Avaliar redação"}</button>
              </div>
              {essay.trim().length > 0 && essay.trim().length < 80 && <small className="essay-hint">Escreva pelo menos 80 caracteres para solicitar a avaliação.</small>}
              {evaluationError && <p className="essay-error">{evaluationError}</p>}
              {evaluation && <article className="essay-result"><p className="section-label">DEVOLUTIVA</p><div>{evaluation}</div></article>}
            </div>
          </article>
        ) : (
          <div className="topic-empty"><span className="empty-spark">✦</span><p className="section-label">SUA VEZ</p><h2>O próximo tema pode mudar<br /> a direção da sua ideia.</h2><p>Clique em “Sortear um tema” para começar.</p></div>
        )}
      </section>

      <section className="writing-method"><div><p className="section-label">UM MÉTODO POSSÍVEL</p><h2>Escrever também é organizar o pensamento.</h2></div><div className="method-grid"><div><b>01</b><h3>Leia o recorte</h3><p>Entenda o problema antes de escolher uma posição.</p></div><div><b>02</b><h3>Construa relações</h3><p>Conecte repertório, causa e consequência.</p></div><div><b>03</b><h3>Revise com calma</h3><p>Retome a tese e confira se a proposta fecha o texto.</p></div></div></section>
    </main>
  );
}
