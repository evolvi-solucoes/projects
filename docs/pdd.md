# PDD: Consulta ao portfólio de automações

*Process Definition Document*. Este documento descreve o processo atual, sem tecnologia.

## 1. Objetivo

Dar a qualquer pessoa da equipe um ponto único para conhecer os projetos de automação e acessar cada um.

O portfólio mostra um projeto desde o início. A situação do projeto muda à medida que ele evolui.

Sem esse ponto, a pessoa precisa perguntar à equipe de TI (Tecnologia da Informação) o que existe e onde fica.

Papéis:

| Papel | Responsabilidade |
|---|---|
| Coordenação de TI | Dona do processo. Decide o que entra na página e aprova cada mudança. |
| Equipe de TI | Responsável pela automação. Mantém a lista de automações e a página. |

Medidas de sucesso:

1. Cobertura de 100%: toda automação em produção aparece na página.
2. Inclusão no início: um projeto novo aparece na página como "Em andamento" quando é iniciado.
3. Documentação completa: o número de automações com documentação completa cresce a cada conferência.

## 2. Escopo
- Dentro do escopo:
  - Os projetos em andamento, em produção, pausados e desativados.
  - O nome, o endereço do repositório e o problema que cada projeto resolve.
  - A situação de cada projeto e a situação da documentação.
  - As datas de início e da última mudança, quando conhecidas.
- Fora do escopo:
  - O estado de execução de cada automação. O supervisor de automações cuida disso.
  - Dados internos: endereços de rede, nomes de clientes e segredos.
  - O aviso em outros sistemas. Ele fica para integrações futuras.

## 3. Processo atual (as-is)

Responsável: a equipe de TI.

1. A pessoa pergunta à equipe de TI qual automação resolve um problema.
2. A equipe de TI procura a pasta da automação no servidor.
3. A equipe de TI explica o que a automação faz.

## 4. Regras de negócio

1. Todo projeto iniciado e toda automação em produção aparecem no portfólio.
2. Cada projeto tem um resumo do problema que ele resolve, em linguagem de negócio.
3. Um projeto novo entra no portfólio quando é iniciado, com a situação "Em andamento".
4. A situação acompanha o projeto: "Em andamento", "Em produção", "Pausado" ou "Desativado".
5. Um projeto desativado continua no portfólio, com a situação "Desativado".
6. A documentação de cada projeto segue o padrão de seis documentos: README, CHANGELOG, PDD, SDD, runbook e ADR.
7. A Coordenação de TI aprova toda inclusão ou mudança.
8. A equipe de TI confere a página contra a lista de automações em produção sempre que uma automação entra ou sai de produção.

## 5. Exceções
| Situação | Ação |
|---|---|
| A automação ainda não tem repositório no GitHub. | Liste a automação com o selo "Repositório em migração". |
| A automação ainda não tem a documentação completa. | Liste a automação com o selo "Documentação pendente" ou "Documentação parcial". |

## 6. Volume

16 automações em produção em 10/11/2026. Nenhum projeto em andamento registrado nessa data.
