const addDayCareCenter = () => {
  map.addLayer({
    id: "day-care-center",
    type: "circle",
    source: {
      type: "geojson",
      data: "https://data.cityofnewyork.us/resource/sd93-evwm.geojson"
    },
    layout: {
      visibility: "none"
    }
  });

  map.setPaintProperty("day-care-center", "circle-opacity", [
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

  map.setPaintProperty("day-care-center", "circle-color", [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    0,
    "#411cfd"
  ]);
};
