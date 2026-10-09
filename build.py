import json, datetime, pathlib
root=pathlib.Path(__file__).resolve().parent
# Numbers in the third-party catalog refer to positions within the 45 Linguagens questions, not the canonical INEP booklet number.
regular={
2015:[133],2016:[128,129,130],2017:[19,31],2018:[13,26,31,43],2019:[9,11,27,35],
2020:[15,36,42],2021:[17,19],2022:[20,34],2023:[35,40,41,42],2024:[7,9,23,26,40,44],2025:[12,18,19,27]}
# 2015 q133 listed by Questões ENEM in caderno absolute numbering; later catalog lists Linguagens-local numbering.
records=[]
for year, nums in regular.items():
 for num in nums:
  source='https://questoesenem.app/provas/enem-2015/questao-133/' if year==2015 else 'https://www.memorizevestibular.com/blog/questoes/materia/educacao-fisica'
  position='caderno_geral' if year==2015 else 'indice_linguagens_terceiros'
  records.append({
   'id':f'enem-{year}-regular-edfis-{num:03d}', 'ano':year,'exame':'ENEM','aplicacao':'regular',
   'area':'Linguagens, Códigos e suas Tecnologias','disciplina':'Educação Física',
   'numero_catalogo':num,'sistema_numeracao':position,'numero_caderno_oficial':num if year==2015 else None,
   'caderno_referencia':None,'pagina_pdf':None,
   'tema':None,'subtemas':[],'competencia':None,'habilidade':None,'dificuldade':None,
   'enunciado':None,'texto_apoio':None,
   'alternativas':[{'letra':c,'texto':None,'imagens':[]} for c in 'ABCDE'],
   'gabarito_oficial':None,'resolucao_comentada':None,
   'imagens':[],
   'fontes':{
    'inep_ano':f'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/{year}',
    'pdf_prova':None,'pdf_gabarito':None,
    'catalogo_identificacao':source,
   },
   'verificacao':{'estado':'identificada','classificacao_confirmada_no_pdf':False,'conteudo_conferido_no_pdf':False,'gabarito_conferido_no_pdf':False,'imagens_conferidas':False,'observacoes':'Identificação preliminar por catálogo independente; revisar prova regular oficial na versão de caderno escolhida.'}
  })
output={
 'versao':'0.1.0','gerado_em':'2026-10-09',
 'escopo':{'anos':[2015,2025],'aplicacoes_incluidas':['regular'],'disciplina':'Educação Física','status':'catalogo_preliminar_nao_pronto_para_publicacao'},
 'avisos':[
  'Não é um banco completo validado: posições identificadas sem extração dos PDFs oficiais.',
  'O catálogo Memorize usa numeração 1–45 da área de Linguagens em vários anos, que não equivale ao número impresso do caderno.',
  'A questão de 2015 foi identificada em outro catálogo e usa a numeração 133 do caderno; por isso o sistema de numeração é diferente.',
  'O catálogo Memorize não apresenta 2015 regular; a inclusão de q133 veio de Questões ENEM e necessita reconciliação.',
  'Cada ano tem diversas cores e ordem diferente: escolher uma versão oficial e mapear posição, caderno e gabarito correspondente.',
  'Enunciado, alternativas, imagens e respostas estão nulos até validação efetiva em fontes oficiais.',
  'Não republicar conteúdo de plataformas de terceiros sem checar direitos e termos.'
 ],
 'total_identificadas':len(records),
 'questoes':records
}
(root/'questoes_educacao_fisica_enem_2015_2025.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'LEIA-ME.md').write_text('''# Base ENEM Educação Física 2015–2025\n\nEsta entrega é um **catálogo preliminar de identificadores**, não uma transcrição validada das questões. Os campos não conferidos permanecem `null`.\n\n## Fontes\n- INEP: `https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/<ANO>`\n- Identificação 2016–2025: `https://www.memorizevestibular.com/blog/questoes/materia/educacao-fisica`\n- Identificação 2015: `https://questoesenem.app/provas/enem-2015/questao-133/`\n\n## Processo necessário\n1. Selecionar a prova **regular de Linguagens** de uma única cor por ano no INEP. Em 2015, Linguagens foi no 2º dia; em edições posteriores, confirmar o dia pela página oficial.\n2. Baixar a prova e gabarito da **mesma cor, edição e aplicação**.\n3. Converter os números 1–45 dos catálogos externos para os números do caderno oficial (não presumir deslocamento fixo sem conferir).\n4. Extrair enunciados, alternativas, tabelas e figuras do PDF, preservando imagens com referência à página.\n5. Conferir manualmente layout, trechos não extraídos, ordenação e identificação temática.\n6. Comparar o gabarito com o PDF oficial.\n7. Somente mudar `verificacao.estado` para `validada` depois de confirmar conteúdo, imagem e resposta.\n\n## Critério de publicação\n`verificacao.estado == "validada"` e `gabarito_oficial != null` e todos os textos de alternativas presentes.\n\n## Observação\nOs materiais públicos devem ser avaliados quanto a direitos autorais e reutilização, especialmente imagens e transcrições integrais em um produto comercial.\n''',encoding='utf-8')
print('Questões catalogadas:',len(records))
print('Por ano:',{y:len(v) for y,v in regular.items()})
print('JSON válido, arquivo:',root/'questoes_educacao_fisica_enem_2015_2025.json')
