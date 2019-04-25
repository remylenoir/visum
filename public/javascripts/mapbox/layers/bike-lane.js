const addBikeLane = () => {
  const id = "bike-routes";
  const data = "./javascripts/mapbox/layers/nyc-bikelane.geojson";

  map.addLayer({
    id,
    type: "line",
    width: 1.5,
    source: {
      type: "geojson",
      data
    },
    layout: {
      visibility: "none"
    }
  });

  map.setPaintProperty(id, "line-opacity", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    9.9,
    0,
    10,
    0.6,
    14,
    0.9
  ]);

  map.setPaintProperty(id, "line-color", [
    "interpolate",
    ["linear"],
    ["zoom"],
    11,
    "hsl(190, 88%, 58%)",
    17,
    "hsl(230, 92%, 52%)"
  ]);
};
