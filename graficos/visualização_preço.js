var specPrecoMedioEvolucao = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Evolução do Preço Médio (2003 a 2018)",
  "background": "transparent",
  "width": 600,
  "height": 300,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_otimizado.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    {"filter": "datum['Ano de Lançamento'] >= 2003 && datum['Ano de Lançamento'] <= 2018"},
    {"filter": "datum['Preco Limpo'] > 0"}
  ],
  "encoding": {
    "x": { "field": "Ano de Lançamento", "type": "ordinal", "axis": {"labelAngle": -45} }
  },
  "layer": [
    {
      "mark": { "type": "line", "color": "#ff7f0e", "strokeWidth": 3 },
      "encoding": { "y": { "field": "Preco Limpo", "aggregate": "mean", "type": "quantitative", "axis": {"title": "Preço Médio"} } }
    },
    {
      "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "nearest": true } }],
      "mark": { "type": "point", "filled": true },
      "encoding": {
        "y": { "field": "Preco Limpo", "aggregate": "mean", "type": "quantitative" },
        "size": { "condition": { "param": "hover", "empty": false, "value": 200 }, "value": 50 },
        "color": { "condition": { "param": "hover", "empty": false, "value": "#66c0f4" }, "value": "#ff7f0e" },
        "tooltip": [
          {"field": "Ano de Lançamento", "title": "Ano", "type": "ordinal"},
          {"field": "Preco Limpo", "aggregate": "mean", "title": "Preço Médio", "type": "quantitative", "format": ".2f"}
        ]
      }
    }
  ]
};
vegaEmbed('#vis_preco_medio', specPrecoMedioEvolucao, {"actions": false});