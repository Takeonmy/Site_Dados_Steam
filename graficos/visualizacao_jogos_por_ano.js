var specJogosAno = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Quantidade de jogos lançados por ano no Steam",
  "background": "transparent",
  "width": 600,  // <-- Mudamos de "container" para 600
  "height": 300,
  "data": {
    "url": "https://raw.githubusercontent.com/Takeonmy/Dados_teste/refs/heads/main/dados_steam_final_otimizado.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    { "filter": "datum['Ano de Lançamento'] != null && datum['Ano de Lançamento'] >= 2003 && datum['Ano de Lançamento'] <= 2018" },
    { "aggregate": [ { "op": "count", "field": "Nome", "as": "QtdJogos" } ], "groupby": ["Ano de Lançamento"] }
  ],
  "encoding": {
    "x": { "field": "Ano de Lançamento", "type": "ordinal", "axis": { "title": "Ano", "labelAngle": -45 }, "sort": "ascending" }
  },
  "layer": [
    {
      "mark": { "type": "line", "color": "#66c0f4", "strokeWidth": 3 },
      "encoding": { "y": { "field": "QtdJogos", "type": "quantitative", "axis": {"title": "Número de jogos lançados"} } }
    },
    {
      "params": [{ "name": "hover", "select": { "type": "point", "on": "mouseover", "nearest": true } }],
      "mark": { "type": "point", "filled": true },
      "encoding": {
        "y": { "field": "QtdJogos", "type": "quantitative" },
        "size": { "condition": { "param": "hover", "empty": false, "value": 200 }, "value": 50 },
        "color": { "condition": { "param": "hover", "empty": false, "value": "#ff7f0e" }, "value": "#66c0f4" },
        "tooltip": [
          {"field": "Ano de Lançamento", "title": "Ano"},
          {"field": "QtdJogos", "title": "Jogos Lançados", "type": "quantitative"}
        ]
      }
    }
  ]
};

// Conecta à div id="vis_jogos_ano" no seu HTML
vegaEmbed('#vis_jogos_ano', specJogosAno, {"actions": false});
