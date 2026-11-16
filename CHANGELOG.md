# Changelog

Este arquivo segue o formato Keep a Changelog e o versionamento semântico (SemVer).

## [Unreleased]

### Added
- Projeto `notion-questor-vidas` (Sincronização de Vidas) em produção, com documentação completa.
- Projeto `rotina-workers-cloudflare` (Rotina Workers Cloudflare) em produção, com documentação completa.
- Host `claude` no campo `roda_em`, com ícone do Claude.
- Filtros em pills com lista suspensa, e filtro `Roda em` com seleção múltipla e ícone de cada host (Make, Notion, Cloudflare, Servidor).
- Campos `roda_em` e `minutos_mes` em cada projeto, e o total de horas economizadas por mês na faixa de números.
- Projeto `onboarding-clientes` (Onboarding de clientes) em produção, com documentação completa.
- Projeto `notificacoes-balancete` (Notificações Balancete) em produção, com documentação completa.
- Área `Contábil` na lista de áreas.
- Projeto `lembrete-departamentos-guias` (Lembrete mensal de guias não visualizadas) em produção, com documentação completa.
- Projeto `tarefa-aniversario-clientes` (Tarefa de aniversário de clientes) em produção, com documentação completa.
- Projeto `tarefa-certificado` (Tarefa de renovação de certificado) em produção, com documentação completa.
- Projeto `encaminhamento-respostas-nibo` (Encaminhamento de respostas do Nibo) em produção, com documentação completa.
- Projeto `avisos-aniversarios-ferias` (Avisos de aniversários e férias) em produção, com documentação completa.
- Projeto `lembrete-tarefas-notion` (Lembrete de tarefas do Notion) em produção, com documentação completa.
- Projeto `fluxo-avisos-reinf-fator-r` (Avisos de REINF/MIT/DCTFWeb e Fator R) em produção, com documentação completa.
- Projeto `encaminhamento-veloxdp` (Encaminhamento de e-mails do Velox) em produção, com documentação completa.
- Projeto `evolvi-obli-clavis` (Assistente Conpluszete) em andamento, com documentação completa.
- Área `Sucesso do Cliente` na lista de áreas.
- Projeto `backup-reinf` (Backup mensal do REINF/MIT/DCTFWeb) em produção, com documentação completa.
- Projeto `backup-fator-r` (Backup mensal do Fator R) em produção, com documentação completa.
- Projeto `evolvi-cronus` (Cronus, controle de tempo por cliente) em andamento, com documentação completa.
- Área `Gestão` na lista de áreas.
- Projeto `sublimite-sn-cpf` (Sublimite SN por sócio) em produção, com documentação completa.
- Projeto `omie-nibo-envio` (Omie – envio de documentos ao Nibo) em produção, com documentação completa.
- Projeto `notion-name-sync` (Sincronização de Nome de Empresa) em produção, com documentação completa.
- Projeto `notion-cnpj-auditor` (Auditoria de Dados Cadastrais) em produção, com documentação completa.
- Projeto `notion-analyst-sync` (Sincronização do Analista Responsável) em produção, com documentação completa.
- Projeto `guias-whatsapp` (Guias por WhatsApp) em andamento, com documentação completa.
- Projeto `alerta-cct` (Alerta de Convenções Coletivas) em produção, com documentação completa.
- Projeto `gob-sync` (Sincronização do Crédito Trabalhador) em produção, com documentação completa.
- Dono do processo, responsável e medidas de sucesso no PDD.
- Coordenação de TI no escalonamento do runbook e na skill.
- Testes de borda com dados falsos em `testes/` e `docs/testes.md`.
- Fluxo de mudança por branch e pull request no README, no SDD e na skill.
- Procedimento de rollback no runbook, com teste registrado.
- ADR 0003: mudanças por pull request.
- Situação de cada projeto: em andamento, em produção, pausado ou desativado. A página mostra um selo e um filtro.
- Datas opcionais de início e de última mudança em cada projeto.
- ADR 0004: situação e datas no JSON, para integrações futuras.
- Testes de borda de situação e de datas.

### Changed
- Datas de última mudança de `guias-whatsapp` e `evolvi-cronus`: a documentação ganhou o cenário Make atual.
- A skill `portfolio-sistemas` passou a se chamar `projeto`.
- O portfólio mostra os projetos desde o início, e não só as automações em produção.
- A contagem da página diz "projetos" em vez de "automações".
- A forma de execução aceita o valor "A definir".

### Removed
- A cópia da skill saiu do repositório. A skill fica só na conta do claude.ai.

### Fixed
- A data "Lista atualizada em" mostra 11/11/2026, a data da inclusão da situação.
- A página ignora projetos com campo vazio, valor fora do padrão ou `id` repetido.
- A busca encontra cada palavra em separado.
- Uma área fora da lista `areas` ganha botão de filtro.
- Nomes e resumos longos quebram a linha em tela estreita.
- A API de sindicatos mostra a documentação completa.
- Links de Omie, Crédito do Trabalhador e Proxy nWeb apontam para os repositórios reais da organização.

## [1.0.0] - 2026-11-10

### Added
- Página do portfólio com busca e filtro por área.
- Lista `projetos.json` com as 16 automações em produção.
- Selos de execução, situação da documentação e migração do repositório.
- Links para PDD, SDD, runbook e ADRs nos projetos com documentação completa.
- Skill `portfolio-sistemas` para incluir e alterar projetos no padrão.
