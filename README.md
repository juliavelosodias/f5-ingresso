# Monitor de Ingressos Ticketmaster

Extensão Chrome (Manifest V3) para monitorar uma página de evento da Ticketmaster e avisar quando houver possível liberação de ingressos.

## Como funciona

- O script de conteúdo (`content.js`) observa mudanças no DOM da página.
- Quando detecta que o estado saiu de `esgotado`, envia uma mensagem para o background.
- O service worker (`background.js`) dispara uma notificação do Chrome.
- Enquanto estiver `esgotado`, a página é recarregada automaticamente a cada 30 segundos.

## Estrutura do projeto

- `manifest.json`: permissões, URL monitorada e registro dos scripts.
- `content.js`: lógica de detecção de disponibilidade e recarga automática.
- `background.js`: exibição das notificações.

## Instalação local (Chrome)

1. Baixe/clone este repositório.
2. Abra o Chrome em `chrome://extensions/`.
3. Ative o `Modo do desenvolvedor`.
4. Clique em `Carregar sem compactação`.
5. Selecione a pasta do projeto.

## Configuração

A URL monitorada está em `manifest.json`, no campo `content_scripts.matches`.

Exemplo atual:

```json
"matches": [
  "https://www.ticketmaster.com.br/event/venda-geral-...*"
]
```

Se quiser monitorar outro evento, substitua esse valor pelo link desejado (mantendo `*` no final quando necessário).

## Ajuste de intervalo de recarga

No arquivo `content.js`, altere a constante:

```js
const INTERVALO_RECARREGAMENTO_MS = 30000;
```

- `30000` = 30 segundos.

## Observações

- Esta extensão depende da estrutura atual da página da Ticketmaster. Se o site mudar, seletores podem precisar de ajuste.
- Use de forma responsável para evitar recargas excessivas.
