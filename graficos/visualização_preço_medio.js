var specHistogramaPrecos = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Histograma de Preços dos Jogos",
  "background": "transparent",
  "width": 600,
  "height": 300,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_otimizado.csv",
    "format": { "type": "csv" }
  },
  "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "clear": "mouseout" } }],
  "mark": { "type": "bar", "cursor": "pointer", "color": "#66c0f4" },
  "transform": [
    {"filter": "datum['Preco Limpo'] > 0 && datum['Preco Limpo'] <= 100"}
  ],
  "encoding": {
    "x": { "bin": {"step": 5}, "field": "Preco Limpo", "type": "quantitative", "axis": {"title": "Faixa de Preço"} },
    "y": { "aggregate": "count", "type": "quantitative", "axis": {"title": "Quantidade de Jogos"} },
    "fillOpacity": { "condition": {"param": "hover", "empty": false, "value": 1}, "value": 0.6 },
    "tooltip": [
      {"field": "Preco Limpo", "bin": {"step": 5}, "title": "Faixa de Preço", "type": "quantitative"},
      {"aggregate": "count", "title": "Quantidade de Jogos", "type": "quantitative"}
    ]
  }
};
vegaEmbed('#vis_histograma', specHistogramaPrecos, {"actions": false});