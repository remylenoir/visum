let addWiFi = () => {
  const id = "wifi-hotspot";
  const data = "https://data.cityofnewyork.us/resource/varh-9tsp.geojson";

  map.addLayer({
    id,
    type: "heatmap",
    source: {
      type: "geojson",
      data
    },
    layout: {
      visibility: "none"
    }
  });

  map.setPaintProperty(id, "heatmap-opacity", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    9.9,
    0,
    10,
    0.2,
    14,
    1
  ]);

  map.setPaintProperty(id, "heatmap-radius", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    10,
    10,
    22,
    35
  ]);
};
