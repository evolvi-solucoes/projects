---
name: portfolio-sistemas
description: Use ao incluir, alterar ou remover uma automação no portfólio de sistemas (página GitHub Pages evolvi-solucoes/projects). Lê a documentação do projeto, monta a entrada do projetos.json no padrão e confere a regra de dados públicos.
---

# Portfólio de sistemas

Esta skill mantém o arquivo `projetos.json` do repositório `evolvi-solucoes/projects`.
A página pública `https://evolvi-solucoes.github.io/projects/` lê esse arquivo.

Use junto com as skills `automacao` e `padrao-documentacao`.

Papéis:

- A Coordenação de TI é a dona do processo. Ela aprova toda inclusão, alteração ou remoção.
- A equipe de TI mantém o `projetos.json`.
- Uma automação nova entra na página até 7 dias depois de entrar em produção.
- Rode o modo conferir sempre que uma automação entrar ou sair de produção.

## Regras de escrita

- Escreva em português do Brasil, no padrão ASD-STE100 adaptado.
- Use frases de até 25 palavras no resumo.
- Use voz ativa.
- Use um termo para cada conceito.

## Regra de dados públicos

ATENÇÃO: a página é pública. Confira cada entrada antes de gravar.

Nunca grave nos campos do projeto:

- endereço IP, nome de servidor ou caminho de rede (`\\`, `F:\`, `L:\`, `C:\`);
- nome de cliente, nome de pessoa, e-mail ou CPF/CNPJ real;
- usuário, senha, token, chave ou URL de webhook;
- porta, rota interna ou endereço `localhost`.

Se a documentação do projeto tiver esses dados, reescreva o resumo sem eles.

## Formato da entrada

```json
{
  "id": "nome-do-repositorio",
  "nome": "Nome legível",
  "repositorio": "https://github.com/evolvi-solucoes/nome-do-repositorio",
  "resumo": "O problema que a automação resolve. Até duas frases.",
  "area": "Fiscal",
  "execucao": "Serviço",
  "documentacao": "completa",
  "publicado": true
}
```

| Campo | Regra |
|---|---|
| `id` | Kebab-case, sem acento. Igual ao nome do repositório. Único no arquivo. |
| `nome` | Nome curto que a equipe usa. |
| `repositorio` | Começa com `https://github.com/`. A página ignora qualquer outro link. |
| `resumo` | Diga o problema que a automação resolve e o resultado para o negócio. Não descreva a tecnologia. |
| `area` | Um valor da lista `areas` do JSON. Para uma área nova, inclua o valor na lista e peça aprovação. |
| `execucao` | `Serviço`, `Tarefa agendada` ou `Manual`. |
| `documentacao` | Veja a regra abaixo. |
| `publicado` | `true` só quando o repositório existe no GitHub. |

### Regra do campo `documentacao`

1. Confira os seis documentos: `README.md`, `CHANGELOG.md`, `docs/pdd.md`, `docs/sdd.md`, `docs/runbook.md` e pelo menos um arquivo em `docs/adr/`.
2. Procure o marcador `<preencher>` em cada documento.
3. Use `completa` quando os seis existem e nenhum tem `<preencher>`.
4. Use `parcial` quando existe pelo menos o `README.md`.
5. Use `pendente` nos demais casos.

## Modo incluir

1. Pergunte o caminho da pasta do projeto. Não presuma.
2. Leia `README.md` e `docs/pdd.md`, se existirem.
3. Tire o resumo da seção "1. Objetivo" do PDD. Sem PDD, use a primeira frase do README.
4. Sem PDD e sem README, leia o código. Marque o resumo como rascunho e peça validação.
5. Descubra a execução no `supervisor/automacoes.yaml`: `processo` vira `Serviço` e `tarefa` vira `Tarefa agendada`. Fora do supervisor, use `Manual`.
6. Leia o remoto com `git -C <pasta> remote -v`. Proponha o `id` a partir do nome do repositório.
7. Aplique a regra do campo `documentacao`.
8. Aplique a regra de dados públicos.
9. Mostre a entrada completa ao usuário. Use AskUserQuestion para a área e para qualquer dúvida.
10. Grave a entrada só depois da aprovação.

## Modo alterar

1. Pergunte qual projeto alterar e o motivo.
2. Repita os passos 2 a 8 do modo incluir.
3. Mostre a diferença entre a entrada atual e a nova.
4. Grave só depois da aprovação.

Use este modo quando a documentação do projeto ficar completa ou quando o repositório for publicado.

## Modo remover

1. Pergunte qual projeto remover e o motivo.
2. Confirme que a automação foi desativada (Fase 11 da skill `automacao`).
3. Remova a entrada só depois da aprovação.

## Modo conferir

Use para revisar o arquivo inteiro. Não altere nada neste modo.

1. Valide o JSON com `python -m json.tool projetos.json`.
2. Para cada projeto, confira os campos obrigatórios e a regra de dados públicos.
3. Confira se o `id` é único.
4. Confira se a `area` está na lista `areas`.
5. Recalcule o campo `documentacao` quando a pasta do projeto estiver acessível.
6. Compare a lista com os itens do `supervisor/automacoes.yaml`. Aponte as automações em produção que faltam.
7. Entregue uma tabela com o estado de cada projeto: `OK`, `Incompleto` ou `Divergente`.
8. Pergunte quais correções aplicar.

## Depois de gravar

ATENÇÃO: nunca grave na branch `main`. Um push na `main` publica a página sem aprovação.

1. Antes de gravar, crie uma branch a partir da `main` atualizada. Exemplo: `feat/inclui-check-esocial`.
2. Atualize o campo `atualizado_em` com a data de hoje, no formato `AAAA-MM-DD`.
3. Valide o JSON com `python -m json.tool projetos.json`.
4. Registre a mudança no `CHANGELOG.md`, na seção `[Unreleased]`.
5. Teste a página com `python -m http.server 8040 --bind 127.0.0.1`.
6. Confira a contagem de projetos e o console do navegador. O console avisa sobre projeto ignorado.
7. Peça aprovação antes do commit e do push da branch.
8. Abra um pull request da branch para a `main`.
9. Peça a aprovação da Coordenação de TI no pull request.
10. Depois da aprovação, faça o merge com **Rebase and merge**.

Para desfazer uma mudança, siga "Desfazer uma mudança (rollback)" em `docs/runbook.md`.

## Regra de commit

Faça commits simples, com uma alteração pequena cada.

1. Faça um commit para cada projeto incluído, alterado ou removido.
2. Faça um commit separado para o `CHANGELOG.md`.
3. Escreva a mensagem curta, em inglês, com o prefixo `feat:`, `fix:`, `docs:` ou `chore:`.

Exemplos:

- `feat: add Check eSocial to the portfolio`
- `fix: correct the Proxy nWeb summary`
- `docs: update CHANGELOG with Check eSocial`
