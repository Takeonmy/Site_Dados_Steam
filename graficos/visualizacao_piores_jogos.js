var specPioresJogos = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Hall da Infâmia: Os 15 Jogos com as Piores Notas (2003 - 2018)",
  "background": "transparent",
  "width": 700,
  "height": 400,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_meta.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    {"filter": "datum['Ano de Lançamento'] >= 2003 && datum['Ano de Lançamento'] <= 2018"},
    {"filter": "datum['Notas'] != null && datum['Notas'] > 0"},
    {"window": [{"op": "rank", "as": "posicao"}], "sort": [{"field": "Notas", "order": "ascending"}]},
    {"filter": "datum.posicao <= 15"}
  ],
  "layer": [
    {
      "mark": { "type": "bar", "color": "#d62728", "cornerRadiusEnd": 4 },
      "encoding": {
        "x": { "field": "Notas", "type": "quantitative", "axis": {"title": "Nota alcançada"} },
        "y": { "field": "Nome", "type": "nominal", "sort": {"field": "Notas", "order": "ascending"}, "axis": {"title": "Título do Jogo"} },
        "tooltip": [
          {"field": "Nome", "title": "Jogo"},
          {"field": "Editoras", "title": "Editora"},
          {"field": "Ano de Lançamento", "title": "Ano", "format": "d"},
          {"field": "Notas", "title": "Nota"}
        ]
      }
    },
    {
      "mark": { "type": "text", "align": "left", "dx": 5, "fontWeight": "bold" },
      "encoding": {
        "x": {"field": "Notas", "type": "quantitative"},
        "y": { "field": "Nome", "type": "nominal", "sort": {"field": "Notas", "order": "ascending"} },
        "text": {"field": "Notas", "type": "quantitative"}
      }
    }
  ]
};
vegaEmbed('#vis_piores_jogos', specPioresJogos, {"actions": false});
