const addSkatepark = () => {
  const id = "skateparks";
  const data = "https://data.cityofnewyork.us/resource/8knb-zsb6.geojson";

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
    10.9,
    0,
    11,
    0.6,
    14,
    0.9
  ]);

  map.setPaintProperty(id, "fill-color", ["interpolate", ["exponential", 0.5], ["zoom"], 0, "#ff1ab2"]);
};
