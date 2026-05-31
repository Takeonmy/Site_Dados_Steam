var specTopEditoras = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Top 10 Editoras com Mais Jogos Lançados",
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
    { "filter": "datum.Editoras != null && datum.Editoras != '' && datum.Editoras != 'N/A'" },
    { "aggregate": [{"op": "count", "as": "Total"}], "groupby": ["Editoras"] },
    { "window": [{"op": "rank", "as": "rank"}], "sort": [{"field": "Total", "order": "descending"}] },
    { "filter": "datum.rank <= 10" }
  ],
  "encoding": {
    "x": { "field": "Total", "type": "quantitative", "axis": {"title": "Jogos Lançados"} },
    "y": { "field": "Editoras", "type": "nominal", "sort": "-x", "axis": {"title": "Editora"} },
    "color": { "field": "Editoras", "type": "nominal", "legend": null },
    "fillOpacity": { "condition": {"param": "hover", "empty": false, "value": 1}, "value": 0.6 },
    "tooltip": [
      {"field": "Editoras", "title": "Editora", "type": "nominal"},
      {"field": "Total", "title": "Jogos Lançados", "type": "quantitative"}
    ]
  }
};
vegaEmbed('#vis_top_editoras', specTopEditoras, {"actions": false});
