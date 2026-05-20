var specProporcao = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Proporção de Jogos Gratuitos vs Pagos",
  "background": "transparent",
  "width": 400,
  "height": 300,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_otimizado.csv",
    "format": { "type": "csv" }
  },
  "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "clear": "mouseout" } }],
  "mark": { "type": "bar", "cornerRadiusEnd": 4, "cursor": "pointer" },
  "transform": [
    { "calculate": "datum.Gratuito == 'True' || datum.Gratuito == true ? 'Gratuito' : 'Pago'", "as": "Status" }
  ],
  "encoding": {
    "x": { "field": "Status", "type": "nominal", "axis": {"title": "Tipo de Distribuição", "labelAngle": 0} },
    "y": { "aggregate": "count", "type": "quantitative", "axis": {"title": "Total de Jogos"} },
    "color": { "field": "Status", "type": "nominal", "scale": { "domain": ["Pago", "Gratuito"], "range": ["#d62728", "#2ca02c"] }, "legend": null },
    "fillOpacity": { "condition": {"param": "hover", "empty": false, "value": 1}, "value": 0.6 },
    "tooltip": [
      {"field": "Status", "title": "Tipo", "type": "nominal"},
      {"aggregate": "count", "title": "Total de Jogos", "type": "quantitative"}
    ]
  }
};
vegaEmbed('#vis_proporcao', specProporcao, {"actions": false});