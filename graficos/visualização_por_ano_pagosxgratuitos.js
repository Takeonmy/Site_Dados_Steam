var specVolumePagos = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Volume de Lançamentos: Pagos vs Gratuitos por Ano",
  "background": "transparent",
  "width": 600,
  "height": 300,
  "data": { 
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_otimizado.csv",
    "format": { "type": "csv" }
  },
  "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "clear": "mouseout" } }],
  "mark": { "type": "bar", "cursor": "pointer" },
  "transform": [
    { "filter": "datum['Ano de Lançamento'] >= 2003 && datum['Ano de Lançamento'] <= 2018" },
    { "calculate": "datum.Gratuito == 'True' || datum.Gratuito == true ? 'Gratuito' : 'Pago'", "as": "Status" }
  ],
  "encoding": {
    "x": { "field": "Ano de Lançamento", "type": "ordinal", "axis": {"labelAngle": -45} },
    "y": { "aggregate": "count", "type": "quantitative", "axis": {"title": "Quantidade Lançada"} },
    "color": { "field": "Status", "type": "nominal", "legend": {"title": "Tipo de Distribuição"}, "scale": { "domain": ["Pago", "Gratuito"], "range": ["#d62728", "#2ca02c"] } },
    "fillOpacity": { "condition": {"param": "hover", "empty": false, "value": 1}, "value": 0.7 },
    "tooltip": [
      {"field": "Ano de Lançamento", "title": "Ano", "type": "ordinal"},
      {"field": "Status", "title": "Tipo", "type": "nominal"},
      {"aggregate": "count", "title": "Quantidade Lançada", "type": "quantitative"}
    ]
  }
};
vegaEmbed('#vis_volume_pagos', specVolumePagos, {"actions": false});