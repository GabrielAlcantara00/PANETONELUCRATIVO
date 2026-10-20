# Natal Sem Glúten — página de vendas

Site estático, com HTML, CSS e JavaScript. Não precisa instalar dependências nem executar compilação. Todos os arquivos de imagem e fontes estão na pasta `assets`.

## Abrir e visualizar

Abra `index.html` no navegador mantendo a pasta `assets` e os demais arquivos ao lado. A entrega também inclui `panetone-preview.html`, uma versão de arquivo único com tudo embutido: basta dar dois cliques, inclusive sem internet.

## Configurar os pagamentos

Abra `config.js` no Bloco de Notas ou em um editor e cole os links entre as aspas:

```js
checkoutCompleto: "https://seu-checkout-do-curso",
checkoutInicial: "https://seu-checkout-do-guia",
checkoutCompleto47: "https://seu-checkout-do-completo-com-desconto",
```

- `checkoutCompleto`: curso de R$57, com preço de referência de R$67 e quatro bônus.
- `checkoutInicial`: guia inicial em PDF de R$12,90, sem as aulas em vídeo e os bônus do curso.
- `checkoutCompleto47`: o mesmo curso completo, com todos os bônus, por R$47. É o valor total, não um adicional sobre o guia.
- `emailSuporte`: exibe seu atendimento no rodapé.
- `nomeResponsavel` e `documentoResponsavel`: identificam quem vende no rodapé e nos termos.

Não remova as aspas nem as vírgulas. Use links completos, começando com `https://`. Com os links vazios ou inválidos, os botões mostram um aviso de inscrições em breve e não encaminham o visitante a outro site.

O curso completo aparece no card verde por R$57. O guia inicial aparece no card branco por R$12,90. Ao clicar no card do guia, abre o pop-up oferecendo o curso completo por R$47. “Quero o completo por R$47” vai para `checkoutCompleto47`; “Continuar só com o guia por R$12,90” vai para `checkoutInicial`. O botão do card verde continua indo diretamente para `checkoutCompleto`, por R$57. Não há pop-up automático por tempo ou saída. Escape, o botão de fechar e o clique fora fecham a janela sem iniciar uma compra.

## Subir no Git e na Vercel

1. Extraia o ZIP.
2. Coloque o conteúdo da pasta `panetone-natal` na raiz do repositório: `index.html`, `styles.css`, `app.js`, `config.js`, `vercel.json` e `assets/`.
3. Na Vercel, importe esse repositório.
4. Se precisar escolher uma opção de projeto, selecione **Other**. Não há comando de build nem de instalação; publique a pasta onde está `index.html`.
5. Após configurar os links, faça uma compra de teste ou use o modo de teste da sua plataforma para conferir pagamento, entrega e acesso.

As fontes e fotos são locais: a página não depende do servidor da referência para carregar. Não há pixel de anúncios, formulário de captura, cookies de marketing, backend ou banco de dados.

## O que foi entregue

- LP responsiva em creme, marrom e verde, com tipografia Montserrat e Inter.
- Mockup PNG original com transparência, gerado para esta oferta.
- Galeria com as oito fotos de panetones da referência.
- Bloco de chocolates e presentes com as quinze fotos de receitas extras.
- Apresentação dos bônus de mockups, precificação e Instagram.
- Calculadora funcional de faturamento, custos variáveis, despesas fixas e saldo.
- Alternância entre objetivos: vender ou preparar para a família.
- Card principal verde de R$57, card inicial branco de R$12,90, pop-up do completo por R$47, FAQ e garantia de sete dias.
- Termos e privacidade básicos em modais, sem dependências externas.

## Conteúdo da oferta e limites desta entrega

Esta entrega é a página de vendas. Não inclui gravação das aulas, receitas testadas, área de membros, produção do guia PDF de entrada ou dos materiais do curso. As prévias dos bônus são representações visuais da oferta proposta. Para comercializar, disponibilize os produtos e materiais descritos na página e confira se o conteúdo real corresponde à descrição, à garantia e ao preço de referência de R$67.

A segmentação adotada foi: curso completo por R$57, guia inicial em PDF por R$12,90 e oferta opcional do completo por R$47 ao escolher o guia. Se o produto de entrada for outro, ajuste o pop-up, a pergunta de comparação no FAQ e os termos em `app.js`.

A VSL não pôde ser reproduzida integralmente pelo navegador de pesquisa. A copy é original, elaborada a partir da página pública, do print fornecido e dos argumentos descritos pelo usuário. Não é transcrição da VSL. Não foram reaproveitados o nome do professor, sua formação, número de alunos ou depoimentos como se fossem do novo produto.

O exemplo de R$15.000 é identificado como faturamento hipotético (200 unidades × R$75), não lucro garantido. A calculadora subtrai os custos informados e lembra que o saldo depende de incluir todas as despesas. Nenhum resultado comercial foi comprovado nesta entrega.

As fotografias de alimentos foram baixadas da página de referência a pedido do usuário. O download não comprova autorização de uso comercial; confirme a licença com o titular ou substitua por fotos próprias antes de publicar. Consulte `FONTES-E-ASSETS.md` e `asset-sources.json`. As imagens estão identificadas na LP como referências de apresentação.

## Editar

- Textos, preços visíveis e estrutura: `index.html`.
- Cores, fontes, espaçamentos e aparência: `styles.css`.
- Links de pagamento e dados de atendimento: `config.js`.
- Calculadora, pop-ups e textos de termos/privacidade: `app.js`.
- Imagens e fontes: `assets/`.

O arquivo único de prévia é uma fotografia da versão entregue: editar o projeto não atualiza esse arquivo automaticamente. Prefira o projeto separado para publicar e editar. Para trocar somente os checkouts na prévia, procure por `checkoutCompleto`, `checkoutInicial` e `checkoutCompleto47` dentro dela.

## Verificação

Conferidos no navegador: carregamento da página, troca de objetivo, cálculo com saldo positivo e negativo, oferta de entrada, botões sem checkout configurado e FAQ. Conferidos também os arquivos locais, referências internas e sintaxe de JavaScript. A revisão visual contempla computador e larguras móveis; o checkout externo depende dos links que ainda serão configurados.
