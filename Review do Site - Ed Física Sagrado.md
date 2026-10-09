# Review do Site — Ed. Física Sagrado (ENEM)

**URL analisada:** https://edfisicaensinomedi.wixsite.com/edfisicasagrado
**Data da análise:** outubro/2026
**Plataforma:** Wix (plano gratuito)

---

## 1. Visão Geral

Site institucional da área de Educação Física do Colégio Sagrado Coração de Jesus (São Paulo/SP), com foco em material de estudo para o ENEM. A proposta é boa e o acervo de questões é valioso, mas o site funciona hoje como um **repositório estático de PDFs** — sem interatividade, sem engajamento e com vários problemas de conteúdo e usabilidade.

### Estrutura atual

| Página | Conteúdo | Estado |
|---|---|---|
| Início | Boas-vindas + atalhos para as seções | Funcional |
| Questões Anos Anteriores | PDFs de 2009 a 2020 e 2023 + lista de temas mais cobrados | **Incompleta** (faltam 2021, 2022, 2024) |
| Vídeos | Dois blocos anunciando vídeos | **Players não aparecem / página quase vazia** |
| Dicas do Enem | 1 PDF de dicas + 1 link externo (blog SAS, post de 2020) | Pouco conteúdo, link desatualizado |
| Temas de Redação no ENEM | 1 PDF com 10 temas | Funcional, mas URL herdada (`/conteudo-das-aulas`) |

---

## 2. Pontos Fortes

- ✅ **Acervo real e relevante:** questões de Educação Física do ENEM organizadas por ano — isso é ouro para o aluno.
- ✅ **Identidade institucional clara:** logo, nome do colégio e dados de contato sempre visíveis.
- ✅ **Lista de conteúdos mais cobrados** desde 2009 — ajuda o aluno a priorizar o estudo.
- ✅ **Menu simples:** só 5 itens, fácil de entender.
- ✅ **Rodapé completo:** endereço, telefone, e-mail e copyright.

---

## 3. Problemas Encontrados

### 🔴 Críticos (conteúdo quebrado ou enganoso)

1. **Vídeos não carregam.** A página "Vídeos" promete dois vídeos (resolução do ENEM 2018 e benefícios do exercício para o cérebro), mas os players não aparecem — só os textos de chamada. A página inicial também promete o vídeo de 2018.
2. **Título promete "2009 até 2024", mas faltam 2021, 2022 e 2024.** O aluno procura a prova mais recente e não encontra.
3. **O arquivo "2023.pdf" não é um PDF** — é um arquivo `.odt` (LibreOffice/Word) com nome enganoso. Muitos celulares não abrem `.odt`, gerando frustração.
4. **Contador "Total de Visitas" está vazio** no rodapé de todas as páginas.

### 🟠 Importantes (usabilidade e consistência)

5. **Banner do Wix no topo** de todas as páginas (plano gratuito) — passa impressão amadora e ocupa espaço.
6. **Cores inconsistentes entre páginas:** os títulos mudam de cor a cada seção (azul → vermelho → verde) e as faixas de fundo também (azul, salmão, laranja, verde). Parece que cada página foi feita em um dia diferente.
7. **Marca d'água gigante** ("Sagrado" e ilustrações) compete com o conteúdo e reduz a legibilidade, principalmente na home.
8. **Botões genéricos "Clique aqui":** texto de link ruim para acessibilidade e SEO. O ideal é o próprio botão dizer o que faz ("Baixar questões 2009–2024").
9. **URL da página de Redação é `/conteudo-das-aulas`** — herança de uma versão antiga. Confunde quem compartilha o link.
10. **Copyright © 2019** desatualizado no rodapé.
11. **Link do blog SAS é de 2020** — conteúdo de 6+ anos atrás apresentado como "dica valiosa".
12. **Menu lateral sem indicação visual forte da página atual** (o destaque verde-água existe, mas é sutil e some no mobile).
13. **Muito espaço vazio** nas páginas de Vídeos e Dicas — sensação de site inacabado.

### 🟡 Oportunidades perdidas

14. **Zero interatividade:** o site é 100% consumo passivo (baixar PDF, assistir vídeo). Nada para o aluno *fazer*.
15. **Sem organização por tema:** as questões só estão por ano. O aluno que quer treinar só "Lutas" ou "Esportes" precisa abrir 15 PDFs.
16. **Sem busca, sem filtros, sem favoritos.**
17. **Sem página "Sobre"** apresentando os professores da área — humaniza e cria vínculo.
18. **Chat "Vamos conversar por chat"** existe, mas não está claro quem responde nem em que horário.
19. **Sem integração com redes sociais** ou canal de vídeos.

---

## 4. Melhorias de Intuitividade (UX/UI)

### 4.1 Consertar primeiro (quick wins — esforço baixo, impacto alto)

| # | Ação | Como fazer no Wix |
|---|---|---|
| 1 | Re-embedar os vídeos ou remover a página até resolver | Elemento "Vídeo do YouTube" nativo do Wix |
| 2 | Converter o `.odt` de 2023 para PDF de verdade | Exportar e re-subir |
| 3 | Adicionar provas de 2021, 2022 e 2024 (ou corrigir o título) | Upload de PDF |
| 4 | Atualizar copyright para o ano atual | Editar rodapé |
| 5 | Renomear a URL `/conteudo-das-aulas` → `/temas-de-redacao` | Configurações de SEO da página |
| 6 | Substituir "Clique aqui" por botões descritivos | Editar textos de botão |

### 4.2 Reorganizar a experiência

**Nova home como "hub de estudo":**
```
┌─────────────────────────────────────────┐
│  🎯 O que você quer fazer hoje?         │
│                                         │
│  [ 📝 Treinar questões ]  [ 🎬 Vídeos ] │
│  [ 💡 Dicas ENEM       ]  [ ✍️ Redação ] │
│                                         │
│  📊 Temas mais cobrados desde 2009      │
│  (gráfico de barras interativo)         │
└─────────────────────────────────────────┘
```

**Questões com dupla organização:**
- Por **ano** (2009 → 2024), como hoje;
- Por **tema** (Esportes, Lutas, Danças, Saúde...) — com tags coloridas;
- Barra de busca simples.

**Identidade visual única:**
- Paleta fixa: azul-marinho (#1B2A6B) + vermelho (#C0392B) do logo + branco;
- Uma cor de destaque para CTAs (verde-água já usado no menu);
- Remover ou reduzir muito a marca d'água de fundo;
- Mesma tipografia e padrão de título em todas as páginas.

**Navegação:**
- Menu no topo (padrão que o aluno espera), com a página atual sublinhada;
- Versão mobile: menu hamburger testado de verdade;
- Breadcrumbs nas páginas internas;
- Adicionar página "Sobre" com foto dos professores de Ed. Física.

---

## 5. Gamificação — a grande alavanca 🎮

Hoje o site é uma "estante de PDFs". Gamificação transforma estudo em **progresso visível, desafio e competição saudável** — perfeito para o público de Ensino Médio. Segue a proposta em camadas, da mais simples à mais ambiciosa.

### 5.1 Camada 1 — Quizzes interativos (implementar já)

**Transformar os PDFs em quizzes jogáveis.** Em vez de só baixar a prova de 2018, o aluno responde online com feedback imediato.

- **Ferramentas gratuitas embedáveis no Wix:** Quizizz, Kahoot, Wordwall ou Google Forms (modo teste);
- Estrutura sugerida: **1 quiz por ano** + **quizzes por tema** (baseado na lista de conteúdos mais cobrados que o site já tem);
- Cada acerto explica *por quê* — vira aprendizado, não só teste.

### 5.2 Camada 2 — Progresso e conquistas

| Mecânica | Como aplicar |
|---|---|
| **Trilha do ENEM** | Mapa visual com os 9 temas mais cobrados; cada quiz completado "acende" um território |
| **Barra de progresso** | "Você completou 6 de 15 anos de provas — 40%" |
| **Badges temáticos** | 🥋 *Mestre das Lutas* · ⚽ *Craque dos Esportes* · 💃 *Estrela da Dança* · 🧠 *Mente Saudável* |
| **Níveis de XP** | Iniciante → Atleta → Medalhista → **Campeão ENEM** |
| **Checklist de missões** | "Complete 3 quizzes esta semana", "Acerte 80% em Esportes" |

### 5.3 Camada 3 — Competição e comunidade

- **Desafio Semanal:** 5 questões inéditas toda segunda; resultado publicado sexta;
- **Ranking entre turmas** (1ª, 2ª e 3ª série competindo) — aproveita a estrutura natural do colégio;
- **Simulado cronometrado** no mês anterior ao ENEM, com tempo real de prova;
- **Certificado digital** compartilhável ao zerar a trilha ("Completei todas as questões de Ed. Física do ENEM 2009–2024");
- **Streak de estudo:** dias consecutivos de acesso, como o Duolingo.

### 5.4 Ferramentas práticas (Wix App Market + externas)

| Objetivo | Ferramenta | Custo |
|---|---|---|
| Quiz com ranking | Quizizz / Kahoot (embed) | Grátis |
| Área do aluno com login | Wix Members Area | Incluso |
| Fórum de dúvidas gamificado | Wix Forum | Incluso |
| Quiz nativo no site | Apps de quiz do Wix App Market | Grátis/pago |
| Progresso + badges | Planilha de pontuação por turma (início) ou app de gamificação | Grátis |
| Remover banner Wix + domínio próprio | Plano pago Wix | ~R$ 20–50/mês |

### 5.5 Roadmap sugerido

```
MÊS 1  → Consertar vídeos, PDFs e títulos + padronizar cores
MÊS 2  → Criar quizzes dos 5 anos mais recentes (Quizizz embedado)
MÊS 3  → Lançar "Desafio Semanal" + badges por tema
MÊS 4  → Ranking entre turmas + trilha de progresso completa
CONTÍNUO → Simulado cronometrado pré-ENEM (anual)
```

---

## 6. Resumo Executivo

| Dimensão | Nota hoje | Comentário |
|---|---|---|
| Conteúdo | ⭐⭐⭐⭐ | Acervo ótimo, mas incompleto e com arquivos quebrados |
| Design/Consistência | ⭐⭐ | Cores e estilos diferentes a cada página |
| Navegação | ⭐⭐⭐ | Simples, mas sem busca, filtros ou organização por tema |
| Interatividade | ⭐ | Zero — só download passivo |
| Gamificação | ⭐ | Inexistente — maior oportunidade do site |

**Conclusão:** o site tem um excelente *conteúdo bruto* (15 anos de questões reais do ENEM), mas entrega de forma passiva e com falhas técnicas que minam a confiança. O caminho é claro: **consertar o que está quebrado → padronizar o visual → transformar PDFs em experiências jogáveis**. Com quizzes, trilhas e ranking entre turmas, o site deixa de ser repositório e vira uma ferramenta de estudo que o aluno *quer* voltar a usar.

---

*Review gerado a partir de análise direta das 5 páginas do site (conteúdo + inspeção visual).*
