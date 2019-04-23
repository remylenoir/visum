let addWiFi = () => {
  map.addLayer({
    id: "wifi-hotspot",
    type: "heatmap",
    source: {
      type: "geojson",
      data: "https://data.cityofnewyork.us/resource/varh-9tsp.geojson"
    }
  });

  // Change Heatmap's opacity based on zoom level
  map.setPaintProperty("wifi-hotspot", "heatmap-opacity", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    0,
    0,
    10.9,
    0,
    11,
    0.2,
    14,
    1
  ]);

  // Change Heatmap's radius based on zoom level
  map.setPaintProperty("wifi-hotspot", "heatmap-radius", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    11,
    10,
    22,
    35
  ]);
};
