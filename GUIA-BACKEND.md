# Guia: configurar o backend (Google Sheets + Apps Script)

Tempo estimado: 10 minutos. Faça uma vez só.

## 1. Criar a planilha

1. Abra https://sheets.google.com e crie uma planilha nova.
2. Renomeie a aba para `Assinaturas` (exatamente esse nome).
3. Na linha 1, coloque o cabeçalho: `Timestamp | Nome | Email | Telefone | Data informada`
4. Copie o ID da planilha da URL: `https://docs.google.com/spreadsheets/d/`**`ID_ATE_AQUI`**`/edit`

## 2. Instalar o Apps Script

1. Na planilha, vá em **Extensões > Apps Script**.
2. Apague o conteúdo do editor e cole o código do arquivo `apps-script/Code.gs` deste projeto.
3. Substitua `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID copiado no passo 1.
4. Salve (Ctrl+S).

## 3. Publicar como Web App

1. Clique em **Implantar > Nova implantação**.
2. Em "Selecionar tipo", escolha **App da Web**.
3. Configure:
   - Descrição: qualquer uma
   - **Executar como: você (sua conta)**
   - **Quem pode acessar: Qualquer pessoa** (essencial — sem isso o site não consegue enviar dados)
4. Clique em **Implantar** e autorize as permissões do Google (clique em Avançado > Ir para o projeto).
5. Copie a **URL do Web App** (termina em `/exec`). É essa URL que vai no site.

## 4. Colocar a URL no site

1. Abra `script.js` deste projeto.
2. Substitua `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL do passo 3.
3. Me avise que eu faço o commit e o redeploy.

## Teste rápido

Abra a URL do Web App no navegador: deve retornar `{"assinaturas":0}`.

Depois teste o envio: preencha o formulário no site e veja se a linha aparece na planilha.
