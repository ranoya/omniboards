# Pinboard Independente

O Omniboard é uma implementação independente dos Pinboards utilizados no meu próprio site, uma ferramenta para construir boards de imagens e vídeos que podem ser filtrados ou catalogados, com seus elementos registrados em uma planilha do Google Docs.

A ferramenta pode ser vista [neste link](https://omniboards.vercel.app/).

Também é possível fazer modificações e filtros na ferramenta diretamente de variáveis de URL:

| variável | exemplo | descrição |
|----------|---------|-----------|
| filtra | filtra=creative | Aplica um filtro aos conteúdos exibidos |
| limita | limita=0 | Número máximo de itens apresentados de forma aleatória; 0 para exibir todos sem limite |
| contentonly | contentonly=true | Não apresenta menus nem rodapés |
| titulo | titulo=teste | Nome exibido na página |
| subtitulo | subtitulo=teste | Termo de subtítulo exibido no topo da página |
| menu | menu=https://www.opensheets.[...] | JSON com os dados do menu a ser exibido |

Um exemplo de modificação pode ser visto por esta URL:

[https://omniboards.vercel.app/?titulo=pixelart&subtitulo=subtitulos&contentonly=true&filtra=pixelart](https://omniboards.vercel.app/?titulo=pixelart&subtitulo=subtitulos&contentonly=true&filtra=pixelart)

A planilha que alimenta o painél pode ser modificada na linha 264 do `index.html`:

```js
getpinboard(
              "https://opensheet.elk.sh/1MUr_AiAYBa184e5ZOUO9jQGD-HvU3rQlOvu0oMAj7fw/Simples",
              "entradapesquisa"
            );
```

Os dados precisam ser lidos no formato `json`, e utilizamos a solução de Ben Borges (opensheet) para fazer essa conversão em tempo real do Google Sheets para `json`.

A planilha utilizada na versão de produção é [esta aqui](https://docs.google.com/spreadsheets/d/1MUr_AiAYBa184e5ZOUO9jQGD-HvU3rQlOvu0oMAj7fw/edit#gid=1358034191).

Apenas duas colunas precisam constar obrigatoriamente nela:

| titulo | imagemurl |
|--------|-----------|
| nome do registro  | endereço url da imagem ou vídeo |

Quaisquer outros campos adicionados nela serão utilizados pelo motor de filtragem para localizar/filtrar os registros.


