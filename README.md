# Portfólio de automações

Esta página lista as automações da Evolvi Soluções e leva ao repositório de cada uma.

Endereço publicado: `https://evolvi-solucoes.github.io/projects/`.

## Requisitos

- Repositório `evolvi-solucoes/projects` no GitHub.
- GitHub Pages ativado no repositório.
- Python 3, só para testar a página no computador.

## Instalação

```bash
git clone https://github.com/evolvi-solucoes/projects.git
```

No GitHub, ative a publicação:

1. Abra **Settings > Pages** do repositório.
2. Em **Source**, escolha **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)`.
4. Clique em **Save**.

## Configuração

A página não usa variáveis de ambiente nem segredos.

| Arquivo | Descrição |
|---|---|
| `projetos.json` | Lista das automações. É o único arquivo que muda no dia a dia. |
| `index.html` | Estrutura da página. |
| `estilo.css` | Aparência, com tema claro e escuro. |
| `app.js` | Lê o `projetos.json` e monta a lista, a busca e o filtro por área. |
| `.nojekyll` | Faz o GitHub Pages publicar os arquivos sem o Jekyll. |

### Campos de cada projeto em `projetos.json`

| Campo | Obrigatório | Descrição |
|---|---|---|
| `id` | Sim | Nome do repositório, em kebab-case. |
| `nome` | Sim | Nome que aparece na página. |
| `repositorio` | Sim | Endereço do repositório. Precisa começar com `https://github.com/`. |
| `resumo` | Sim | O problema que a automação resolve. Até duas frases, linguagem de negócio. |
| `area` | Sim | Uma das áreas da lista `areas`. |
| `execucao` | Sim | `Serviço`, `Tarefa agendada` ou `Manual`. |
| `documentacao` | Sim | `completa`, `parcial` ou `pendente`. |
| `publicado` | Sim | `true` quando o repositório já existe no GitHub. |

Aviso: a página é pública. Não escreva no resumo endereço IP, caminho de rede, nome de cliente, nome de pessoa ou segredo.

## Execução

Para testar no computador, execute na pasta do projeto:

```bash
python -m http.server 8040 --bind 127.0.0.1
```

Depois, abra `http://127.0.0.1:8040`.

Aviso: abrir o `index.html` direto do disco não funciona. O navegador bloqueia a leitura do `projetos.json` fora de um servidor.

Antes de publicar uma mudança no `app.js` ou no `estilo.css`, execute os testes de borda. Siga `docs/testes.md`.

Para incluir ou alterar um projeto, use a skill `projeto`. A cópia da skill fica em `skill/projeto/SKILL.md`.

## Fluxo de mudança

Toda mudança passa por uma branch e por um pull request. Um push na `main` publica a página.

1. Atualize a `main` local:

   ```bash
   git switch main
   git pull
   ```

2. Crie uma branch com o tipo e um nome curto:

   ```bash
   git switch -c fix/descricao-curta
   ```

3. Faça commits pequenos, um para cada mudança. Escreva a mensagem em inglês, sem linha de coautoria.
4. Teste a página no servidor local.
5. Se mudou o `app.js` ou o `estilo.css`, execute os testes de borda de `docs/testes.md`.
6. Envie a branch:

   ```bash
   git push -u origin fix/descricao-curta
   ```

7. Abra um pull request da branch para a `main`.
8. Peça a aprovação da Coordenação de TI.
9. Depois da aprovação, faça o merge com **Rebase and merge**. Essa opção mantém os commits pequenos na `main`.
10. Apague a branch.

Para desfazer uma mudança publicada, siga "Desfazer uma mudança (rollback)" em `docs/runbook.md`.

## Limites conhecidos

- A página não consulta o GitHub. O campo `publicado` é atualizado à mão.
- Um repositório privado pede login. Quem não tem acesso vê o erro 404 do GitHub.
- O link de documentação aparece só para projetos com `documentacao` igual a `completa`. Ele presume a branch `main`.
- O GitHub Pages pode levar alguns minutos para publicar uma alteração.

## Documentação

Veja a pasta `docs/` para os demais documentos:

- `docs/pdd.md`: o processo de negócio.
- `docs/sdd.md`: a solução técnica.
- `docs/runbook.md`: a operação e as falhas comuns.
- `docs/adr/`: as decisões técnicas.
