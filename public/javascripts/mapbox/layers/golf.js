const addGolf = () => {
  const id = "golf";
  const data = "https://data.cityofnewyork.us/resource/snr4-t66y.geojson";

  map.addLayer({
    id,
    type: "fill",
    source: {
      type: "geojson",
      data
    },
    layout: {
      visibility: "none"
    }
  });

  map.setPaintProperty(id, "fill-opacity", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    9.9,
    0,
    10,
    0.6,
    14,
    0.8
  ]);

  map.setPaintProperty(id, "fill-color", ["interpolate", ["exponential", 0.5], ["zoom"], 0, "#9924ff"]);
};
