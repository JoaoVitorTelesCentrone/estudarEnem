# Banco de 100 temas de redação — ENEM 2026

Este pacote contém 100 propostas autorais de treino, separadas em 10 categorias, com enunciado, roteiro de reflexão, repertórios sugeridos para pesquisa e instruções para curadoria de coletânea. **Não** são temas oficiais nem previsões estatísticas.

## Como usar
- Importe `temas_redacao_enem_2026_100.json` e leia `temas`.
- Filtre por `categoria`, `dificuldade`, `prioridade_editorial`.
- O campo `textos_motivadores_sugeridos` orienta pesquisa. O campo `textos_motivadores_publicados` está intencionalmente vazio: publique apenas depois de verificar conteúdo, fontes e direitos.
- `status: pronto_para_treino_sem_coletanea` significa que o enunciado está pronto, mas não há coletânea finalizada.

## Referência
INEP — cartilha de redação do ENEM 2026: https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/enem-2026-cartilha-da-redacao-esta-disponivel

## Modelo de geração
Para seleção aleatória use um id ou filtro de categoria, não prometa que a proposta será cobrada. Evite repetir temas para a mesma pessoa armazenando ids recentes.
