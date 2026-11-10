# Runbook: Portfólio de automações

Este documento guia quem opera a página. Use-o, sobretudo, durante uma falha.

## Iniciar
1. Abra **Settings > Pages** do repositório `evolvi-solucoes/projects`.
2. Escolha a branch `main` e a pasta `/ (root)`.
3. Clique em **Save**.
4. Aguarde a publicação na aba **Actions**.

## Parar
1. Abra **Settings > Pages** do repositório.
2. Em **Source**, escolha **None**, ou clique em **Unpublish site**.

## Desfazer uma mudança (rollback)

Use este procedimento quando uma mudança publicada quebra a página ou expõe um dado indevido.

ATENÇÃO: se a mudança expôs um dado indevido, pare a página primeiro. Siga "Parar". O histórico do Git continua público mesmo depois do rollback.

1. Encontre os commits da mudança:

   ```bash
   git switch main
   git pull
   git log --oneline
   ```

2. Crie uma branch de rollback:

   ```bash
   git switch -c revert/descricao-curta
   ```

3. Desfaça os commits. Para um commit:

   ```bash
   git revert --no-edit <commit>
   ```

   Para vários commits seguidos, do mais antigo ao mais novo:

   ```bash
   git revert --no-edit <mais-antigo>^..<mais-novo>
   ```

4. Teste a página no servidor local.
5. Envie a branch e abra um pull request para a `main`.
6. Peça a aprovação da Coordenação de TI.
7. Faça o merge com **Rebase and merge**.
8. Aguarde a publicação na aba **Actions**.
9. Siga "Verificar saúde".

Nunca use `git push --force` na `main` para um rollback. O `git revert` mantém o histórico e pode ser desfeito.

## Verificar saúde
1. Abra `https://evolvi-solucoes.github.io/projects/`.
2. Confira se a contagem mostra o número de projetos do `projetos.json`.
3. Abra o console do navegador. Confira se não existe aviso de projeto ignorado.

## Falhas comuns
| Sintoma | Causa provável | Ação |
|---|---|---|
| A página mostra "Não foi possível carregar a lista de automações". | JSON inválido no `projetos.json`. | Valide o arquivo com `python -m json.tool projetos.json`. Corrija e faça o push. |
| Um projeto não aparece. | O campo `repositorio` não começa com `https://github.com/`. | Corrija o link no `projetos.json`. |
| O link do projeto abre o erro 404. | O repositório ainda não existe ou é privado. | Crie o repositório ou peça acesso. Confira o campo `publicado`. |
| A alteração não aparece na página. | A publicação do Pages ainda não terminou ou falhou. | Veja a aba **Actions**. Recarregue a página sem cache. |
| A página abre o erro 404 do GitHub Pages. | O Pages está desativado ou aponta para outra pasta. | Repita o procedimento "Iniciar". |

## Escalonamento

1. Equipe de TI, responsável pela página e pelo repositório `evolvi-solucoes/projects`.
2. Coordenação de TI, dona do processo, para decidir sobre conteúdo ou para parar a página.
3. Administrador da organização `evolvi-solucoes` no GitHub, para problemas de permissão ou de Pages.
