var specMelhorJogo = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Jogo com a Maior Nota de Cada Ano (2003 - 2018)",
  "background": "transparent",
  "width": 700,
  "height": 400,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_meta.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    {"filter": "datum['Ano de Lançamento'] >= 2003 && datum['Ano de Lançamento'] <= 2018"},
    {"filter": "datum['Notas'] != null"},
    {"aggregate": [{"op": "argmax", "field": "Notas", "as": "JogoDestaque"}], "groupby": ["Ano de Lançamento"]},
    {"calculate": "datum.JogoDestaque.Nome", "as": "NomeDoJogo"},
    {"calculate": "datum.JogoDestaque.Notas", "as": "NotaMaxima"},
    {"calculate": "length(datum.NomeDoJogo) > 12 ? substring(datum.NomeDoJogo, 0, 12) + '...' : datum.NomeDoJogo", "as": "NomeCurto"}
  ],
  "encoding": {
    "x": { "field": "Ano de Lançamento", "type": "ordinal", "axis": { "title": "Ano", "labelAngle": -45, "format": "d" } },
    "y": { "field": "NotaMaxima", "type": "quantitative", "scale": {"zero": false}, "axis": {"title": "Nota Máxima do Ano"} }
  },
  "layer": [
    {
      "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "clear": "mouseout" } }],
      "mark": { "type": "point", "filled": true, "cursor": "pointer" },
      "encoding": {
        "size": { "condition": {"param": "hover", "empty": false, "value": 300}, "value": 150 },
        "color": { "condition": {"param": "hover", "empty": false, "value": "#66c0f4"}, "value": "#ff7f0e" },
        "tooltip": [
          {"field": "Ano de Lançamento", "title": "Ano", "type": "quantitative", "format": "d"},
          {"field": "NomeDoJogo", "title": "Melhor Jogo", "type": "nominal"},
          {"field": "NotaMaxima", "title": "Nota alcançada", "type": "quantitative"}
        ]
      }
    },
    {
      "mark": { "type": "text", "dy": 15, "fontSize": 11, "fontWeight": "bold", "cursor": "pointer" },
      "encoding": {
        "text": {"field": "NomeCurto", "type": "nominal"},
        "tooltip": [
          {"field": "Ano de Lançamento", "title": "Ano", "type": "quantitative", "format": "d"},
          {"field": "NomeDoJogo", "title": "Melhor Jogo", "type": "nominal"},
          {"field": "NotaMaxima", "title": "Nota alcançada", "type": "quantitative"}
        ]
      }
    }
  ]
};
vegaEmbed('#vis_maior_nota', specMelhorJogo, {"actions": false});