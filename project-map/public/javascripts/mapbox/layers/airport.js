const addAirport = () => {
  map.addLayer({
    id: "airport",
    type: "fill",
    source: {
      type: "geojson",
      data: "https://data.cityofnewyork.us/resource/6dic-zdhf.geojson"
    },
    layout: {
      visibility: "none"
    }
  });

  map.setPaintProperty("airport", "fill-opacity", [
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

  map.setPaintProperty("airport", "fill-color", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    0,
    "#ff1ab2"
  ]);
};
